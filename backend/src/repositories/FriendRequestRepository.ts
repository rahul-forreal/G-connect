import {
    FriendRequest,
    FriendRequestStatus,
} from "@prisma/client";
import prisma from "../lib/prisma";

export class FriendRequestRepository {

    async create(
        senderId: number,
        receiverId: number
    ): Promise<FriendRequest> {
        return prisma.friendRequest.create({
            data: {
                senderId,
                receiverId,
            },
        });
    }

    async findById(
        id: number
    ): Promise<FriendRequest | null> {
        return prisma.friendRequest.findUnique({
            where: {
                id,
            },
        });
    }

    async findPendingBetweenUsers(
        senderId: number,
        receiverId: number
    ): Promise<FriendRequest | null> {
        return prisma.friendRequest.findUnique({
            where: {
                senderId_receiverId: {
                    senderId,
                    receiverId,
                },
            },
        });
    }

    async getIncomingRequests(
        userId: number
    ): Promise<FriendRequest[]> {
        return prisma.friendRequest.findMany({
            where: {
                receiverId: userId,
                status: FriendRequestStatus.PENDING,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getOutgoingRequests(
        userId: number
    ): Promise<FriendRequest[]> {
        return prisma.friendRequest.findMany({
            where: {
                senderId: userId,
                status: FriendRequestStatus.PENDING,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async updateStatus(
        id: number,
        status: FriendRequestStatus
    ): Promise<FriendRequest> {
        return prisma.friendRequest.update({
            where: {
                id,
            },
            data: {
                status,
            },
        });
    }

    async delete(
        id: number
    ): Promise<void> {
        await prisma.friendRequest.delete({
            where: {
                id,
            },
        });
    }
}