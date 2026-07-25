import { FriendRequestStatus } from "@prisma/client";

import redis from "../config/redis";

import { FriendRequestRepository } from "../repositories/FriendRequestRepository";
import { FriendshipRepository } from "../repositories/FriendshipRepository";
import { UserRepository } from "../repositories/UserRepository";

export class FriendRequestService {

    constructor(
        private friendRequestRepository: FriendRequestRepository,
        private friendshipRepository: FriendshipRepository,
        private userRepository: UserRepository
    ) {}

    async sendRequest(
        senderId: number,
        receiverId: number
    ) {

        if (senderId === receiverId) {
            throw new Error("Cannot send friend request to yourself");
        }

        const sender =
            await this.userRepository.findById(senderId);

        const receiver =
            await this.userRepository.findById(receiverId);

        if (!sender || !receiver) {
            throw new Error("User not found");
        }

        const alreadyFriends =
            await this.friendshipRepository.areFriends(
                senderId,
                receiverId
            );

        if (alreadyFriends) {
            throw new Error("Users are already friends");
        }

        const existing =
            await this.friendRequestRepository.findPendingBetweenUsers(
                senderId,
                receiverId
            );

        if (existing) {
            throw new Error("Friend request already exists");
        }

        return await this.friendRequestRepository.create(
            senderId,
            receiverId
        );
    }

    async getIncomingRequests(userId: number) {

        return this.friendRequestRepository.getIncomingRequests(
            userId
        );

    }

    async getOutgoingRequests(userId: number) {

        return this.friendRequestRepository.getOutgoingRequests(
            userId
        );

    }

    async acceptRequest(requestId: number) {

        const request =
            await this.friendRequestRepository.findById(
                requestId
            );

        if (!request) {
            throw new Error("Friend request not found");
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

        await this.friendshipRepository.addFriend(
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

    async rejectRequest(requestId: number) {

        const request =
            await this.friendRequestRepository.findById(
                requestId
            );

        if (!request) {
            throw new Error("Friend request not found");
        }

        await this.friendRequestRepository.updateStatus(
            requestId,
            FriendRequestStatus.REJECTED
        );

        await this.friendRequestRepository.delete(
            requestId
        );

    }

    async cancelRequest(requestId: number) {

        await this.friendRequestRepository.delete(
            requestId
        );

    }

}