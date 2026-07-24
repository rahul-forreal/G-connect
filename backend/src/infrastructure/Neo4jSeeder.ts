import driver from "../lib/neo4j";

export interface Friendship {
    user1: number;
    user2: number;
}

export class Neo4jSeeder {

    async clearGraph(): Promise<void> {

        const session = driver.session();

        try {

            await session.run(`
                MATCH (n)
                DETACH DELETE n
            `);

        } finally {

            await session.close();

        }

    }

    async createUsers(userIds: number[]): Promise<void> {

        const session = driver.session();

        try {

            await session.run(
                `
                UNWIND $users AS id

                MERGE (:User {
                    id: id
                })
                `,
                {
                    users: userIds
                }
            );

        } finally {

            await session.close();

        }

    }

    async createFriendships(
        friendships: Friendship[]
    ): Promise<void> {

        const session = driver.session();

        try {

            await session.run(
                `
                UNWIND $friendships AS friendship

                MATCH (u1:User {
                    id: friendship.user1
                })

                MATCH (u2:User {
                    id: friendship.user2
                })

                MERGE (u1)-[:FRIEND]->(u2)

                MERGE (u2)-[:FRIEND]->(u1)
                `,
                {
                    friendships
                }
            );

        } finally {

            await session.close();

        }

    }

}