import { Neo4jSeeder } from "../infrastructure/Neo4jSeeder";
import prisma from "../lib/prisma";

import { UserGenerator } from "../generators/UserGenerator";

import { INTERESTS } from "../generators/InterestGenerator";
import driver from "../lib/neo4j";

import { FriendshipGenerator } from "../generators/FriendshipGenerator";
import { sampleMany, randomInt } from "../utils/random";
import { faker } from "@faker-js/faker";

faker.seed(42);

const neo4jSeeder = new Neo4jSeeder();
const USER_COUNT = 10000;
async function seed() {

    await clearDatabase();

    await neo4jSeeder.clearGraph();

    await seedUsers(USER_COUNT);

    await seedInterests();

    await assignInterests();

    const users = await prisma.user.findMany({

        select: {
            id: true
        }

    });

    const userIds = users.map(user => user.id);

    await neo4jSeeder.createUsers(userIds);
    const friendshipGenerator = new FriendshipGenerator();

    friendshipGenerator.generate(userIds);

    const friendships = friendshipGenerator.getFriendships();

    console.log(`Generated ${friendships.length} friendships`);

    await neo4jSeeder.createFriendships(friendships);
    console.log("--------------------------------");

    console.log("Users:", userIds.length);

    console.log("Friendships:", friendships.length);

    console.log(
        "Average Friends/User:",
        ((friendships.length * 2) / userIds.length).toFixed(2)
    );

    console.log("--------------------------------");
    }

async function clearDatabase() {
    console.log("Clearing database...");

    await prisma.$executeRawUnsafe(`
        TRUNCATE TABLE
        "UserInterest",
        "Interest",
        "User"
        RESTART IDENTITY CASCADE;
    `);

    console.log("Database cleared");
}

async function seedUsers(count: number) {

    console.log(`Generating ${count} users...`);

    const generator = new UserGenerator();

    const users = generator.generate(count);

    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });

    console.log(`${count} users inserted`);
}

async function seedInterests() {

    console.log("Generating interests...");

    await prisma.interest.createMany({

        data: INTERESTS.map(name => ({
            name
        })),

        skipDuplicates: true

    });

    console.log(`${INTERESTS.length} interests inserted`);

}

async function assignInterests() {

    console.log("Assigning interests...");

    const users = await prisma.user.findMany({
        select: {
            id: true
        }
    });

    const interests = await prisma.interest.findMany({
        select: {
            id: true
        }
    });

    const mappings: {
        userId: number;
        interestId: number;
    }[] = [];

    for (const user of users) {

        const picked = sampleMany(
            interests,
            randomInt(3, 8)
        );

        for (const interest of picked) {

            mappings.push({
                userId: user.id,
                interestId: interest.id
            });

        }

    }

    await prisma.userInterest.createMany({
        data: mappings,
        skipDuplicates: true
    });

    console.log(`${mappings.length} user-interest mappings inserted`);
}

seed()
    .then(() => {
        console.log("Seeding Completed");
    })
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect();
        await driver.close();
    });
