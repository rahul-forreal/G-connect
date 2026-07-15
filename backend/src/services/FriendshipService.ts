import { FriendshipRepository } from "../repositories/FriendshipRepository";
import { UserRepository } from "../repositories/UserRepository";

export class FriendshipService {
    constructor(
        private friendshipRepository: FriendshipRepository,
        private userRepository: UserRepository
    ) {}

    async addFriend(user1: number, user2: number): Promise<void> {
        if (user1 === user2) {
            throw new Error("User cannot add themselves as a friend");
        }

        const firstUser = await this.userRepository.findById(user1);
        const secondUser = await this.userRepository.findById(user2);

        if (!firstUser || !secondUser) {
            throw new Error("User not found");
        }

        await this.friendshipRepository.createUserNode(user1);
        await this.friendshipRepository.createUserNode(user2);

        await this.friendshipRepository.addFriend(user1, user2);
    }

    async removeFriend(user1: number, user2: number): Promise<void> {
        await this.friendshipRepository.removeFriend(user1, user2);
    }

    async getFriends(userId: number): Promise<number[]> {
        return await this.friendshipRepository.getFriends(userId);
    }

    async getMutualFriends(
        user1: number,
        user2: number
    ): Promise<number[]> {
        return await this.friendshipRepository.getMutualFriends(
            user1,
            user2
        );
    }
}