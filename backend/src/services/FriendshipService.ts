import { SocialGraph } from "./SocialGraph";

export class FriendshipService {
    constructor(private graph: SocialGraph) {}

    addFriend(user1: number, user2: number): void {
        if (!this.graph.getUser(user1) || !this.graph.getUser(user2)) {
            throw new Error("User not found");
        }

        this.graph.addFriend(user1, user2);
    }

    removeFriend(user1: number, user2: number): void {
        if (!this.graph.getUser(user1) || !this.graph.getUser(user2)) {
            throw new Error("User not found");
        }

        this.graph.removeFriend(user1, user2);
    }

    getFriends(userId: number): number[] {
        if (!this.graph.getUser(userId)) {
            throw new Error("User not found");
        }

        return Array.from(this.graph.getFriends(userId));
    }

    getMutualFriends(user1: number, user2: number): number[] {
        if (!this.graph.getUser(user1) || !this.graph.getUser(user2)) {
            throw new Error("User not found");
        }

        return Array.from(this.graph.getMutualFriends(user1, user2));
    }
}