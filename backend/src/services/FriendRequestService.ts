import { FriendRequest, FriendRequestStatus } from "@prisma/client";

import redis from "../config/redis";

import { FriendRequestRepository } from "../repositories/FriendRequestRepository";
import { FriendshipRepository } from "../repositories/FriendshipRepository";
import { UserRepository } from "../repositories/UserRepository";

import { BadRequestError } from "../errors/BadRequestError";
import { ConflictError } from "../errors/ConflictError";
import { NotFoundError } from "../errors/NotFoundError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class FriendRequestService {
    constructor(
        private friendRequestRepository: FriendRequestRepository,
        private friendshipRepository: FriendshipRepository,
        private userRepository: UserRepository
    ) {}

    async sendRequest(
        senderId: number,
        receiverId: number
    ): Promise<FriendRequest> {

        if (senderId === receiverId) {
            throw new BadRequestError(
                "Cannot send friend request to yourself"
            );
        }

        const sender = await this.userRepository.findById(senderId);
        const receiver = await this.userRepository.findById(receiverId);

        if (!sender || !receiver) {
            throw new NotFoundError("User not found");
        }

        const areFriends =
            await this.friendshipRepository.areFriends(
                senderId,
                receiverId
            );

        if (areFriends) {
            throw new ConflictError(
                "Users are already friends"
            );
        }

        const existing =
            await this.friendRequestRepository.findPendingBetweenUsers(
                senderId,
                receiverId
            );

        if (existing) {
            throw new ConflictError(
                "Friend request already exists"
            );
        }

        const reverse =
            await this.friendRequestRepository.findReversePending(
                senderId,
                receiverId
            );

        if (reverse) {
            throw new ConflictError(
                "Incoming friend request already exists from this user"
            );
        }

        return this.friendRequestRepository.create(
            senderId,
            receiverId
        );
    }

    async getIncomingRequests(
        userId: number
    ): Promise<FriendRequest[]> {

        return this.friendRequestRepository.getIncomingRequests(
            userId
        );
    }

    async getOutgoingRequests(
        userId: number
    ): Promise<FriendRequest[]> {

        return this.friendRequestRepository.getOutgoingRequests(
            userId
        );
    }

    async acceptRequest(
        requestId: number,
        receiverId: number
    ): Promise<void> {

        const request =
            await this.friendRequestRepository.findPendingForReceiver(
                requestId,
                receiverId
            );

        if (!request) {
            throw new NotFoundError(
                "Friend request not found"
            );
        }

        await this.friendRequestRepository.updateStatus(
            requestId,
            FriendRequestStatus.ACCEPTED
        );

        await this.friendshipRepository.createUserNode(
            request.senderId
        );

        await this.friendshipRepository.createUserNode(
            request.receiverId
        );

        await this.friendshipRepository.createFriendship(
            request.senderId,
            request.receiverId
        );

        await redis.del(
            `recommendations:${request.senderId}`
        );

        await redis.del(
            `recommendations:${request.receiverId}`
        );

        await this.friendRequestRepository.delete(
            requestId
        );
    }

    async rejectRequest(
        requestId: number,
        receiverId: number
    ): Promise<void> {

        const request =
            await this.friendRequestRepository.findPendingForReceiver(
                requestId,
                receiverId
            );

        if (!request) {
            throw new NotFoundError(
                "Friend request not found"
            );
        }

        await this.friendRequestRepository.updateStatus(
            requestId,
            FriendRequestStatus.REJECTED
        );

        await this.friendRequestRepository.delete(
            requestId
        );
    }

    async cancelRequest(
        requestId: number,
        senderId: number
    ): Promise<void> {

        const request =
            await this.friendRequestRepository.findById(
                requestId
            );

        if (!request) {
            throw new NotFoundError(
                "Friend request not found"
            );
        }

        if (request.senderId !== senderId) {
            throw new UnauthorizedError(
                "You are not allowed to perform this action"
            );
        }

        await this.friendRequestRepository.delete(
            requestId
        );
    }
}