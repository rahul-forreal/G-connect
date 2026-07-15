import driver from "../lib/neo4j";

export class FriendshipRepository {

    async createUserNode(userId: number): Promise<void> {
        const session = driver.session();

        try {
            await session.run(
                `
                MERGE (u:User {id: $id})
                `,
                {
                    id: userId,
                }
            );
        } finally {
            await session.close();
        }
    }
    async addFriend(user1: number, user2: number): Promise<void> {
        const session = driver.session();

        try {
            await session.run(
                `
                MATCH (u1:User {id:$user1})
                MATCH (u2:User {id:$user2})

                MERGE (u1)-[:FRIEND]->(u2)
                MERGE (u2)-[:FRIEND]->(u1)
                `,
                {
                    user1,
                    user2,
                }
            );
        } finally {
            await session.close();
        }
    }
    async getFriends(userId: number): Promise<number[]> {
        const session = driver.session();

        try {
            const result = await session.run(
                `
                MATCH (u:User {id:$userId})-[:FRIEND]->(friend:User)
                RETURN friend.id AS id
                `,
                {
                    userId,
                }
            );

            return result.records.map((record) =>
                Number(record.get("id"))
            );
        } finally {
            await session.close();
        }
    }
    async getMutualFriends(
        user1: number,
        user2: number
    ): Promise<number[]> {

        const session = driver.session();

        try {

            const result = await session.run(
                `
                MATCH (u1:User {id:$user1})-[:FRIEND]->(mutual:User)<-[:FRIEND]-(u2:User {id:$user2})

                RETURN DISTINCT mutual.id AS id
                `,
                {
                    user1,
                    user2,
                }
            );

            return result.records.map(record =>
                Number(record.get("id"))
            );

        } finally {

            await session.close();

        }

    }
    async removeFriend(
        user1: number,
        user2: number
    ): Promise<void> {

        const session = driver.session();

        try {

            await session.run(
                `
                MATCH (u1:User {id:$user1})-[r1:FRIEND]->(u2:User {id:$user2})
                DELETE r1

                WITH u1,u2

                MATCH (u2)-[r2:FRIEND]->(u1)
                DELETE r2
                `,
                {
                    user1,
                    user2,
                }
            );

        } finally {

            await session.close();

        }

    }
    async getCandidates(userId: number): Promise<number[]> {
        const session = driver.session();

        try {
            const result = await session.run(
                `
                MATCH (u:User {id:$userId})-[:FRIEND]->(:User)-[:FRIEND]->(candidate:User)

                WHERE candidate.id <> $userId

                AND NOT (u)-[:FRIEND]->(candidate)

                RETURN DISTINCT candidate.id AS id
                `,
                {
                    userId,
                }
            );

            return result.records.map(record =>
                Number(record.get("id"))
            );

        } finally {
            await session.close();
        }
    }
}