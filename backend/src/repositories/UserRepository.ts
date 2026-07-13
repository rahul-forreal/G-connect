import { User } from "@prisma/client";
import prisma from "../lib/prisma";

export class UserRepository {
    async create(name: string, email: string): Promise<User> {
        return prisma.user.create({
            data: {
                name,
                email,
            },
        });
    }

    async findById(id: number): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                id,
            },
        });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                email,
            },
        });
    }

    async findAll(): Promise<User[]> {
        return prisma.user.findMany();
    }

    async update(
        id: number,
        data: Partial<Pick<User, "name" | "email">>
    ): Promise<User> {
        return prisma.user.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: number): Promise<void> {
        await prisma.user.delete({
            where: {
                id,
            },
        });
    }
}