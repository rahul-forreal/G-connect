import prisma from "../lib/prisma";

export class InterestRepository {
    async addInterest(
        userId: number,
        interestName: string
    ): Promise<void> {
        const interest = await prisma.interest.upsert({
            where: {
                name: interestName
            },
            update: {},
            create: {
                name: interestName
            }
        });

        await prisma.userInterest.upsert({
            where: {
                userId_interestId: {
                    userId,
                    interestId: interest.id
                }
            },
            update: {},
            create: {
                userId,
                interestId: interest.id
            }
        });
    }

    async removeInterest(
        userId: number,
        interestName: string
    ): Promise<void> {
        const interest = await prisma.interest.findUnique({
            where: {
                name: interestName
            }
        });

        if (!interest) {
            return;
        }

        await prisma.userInterest.deleteMany({
            where: {
                userId,
                interestId: interest.id
            }
        });
    }

    async getUserInterests(
        userId: number
    ): Promise<Set<string>> {
        const userInterests = await prisma.userInterest.findMany({
            where: {
                userId
            },
            include: {
                interest: true
            }
        });

        return new Set(
            userInterests.map(
                userInterest => userInterest.interest.name
            )
        );
    }
}