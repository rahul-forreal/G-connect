import { randomInt, sample } from "../utils/random";

export interface Friendship {
    user1: number;
    user2: number;
}

export class FriendshipGenerator {

    private graph = new Map<number, Set<number>>();

    initialize(userIds: number[]) {

        this.graph.clear();

        for (const id of userIds) {
            this.graph.set(id, new Set());
        }

    }

    private addFriend(user1: number, user2: number) {

        if (user1 === user2) return;

        this.graph.get(user1)?.add(user2);
        this.graph.get(user2)?.add(user1);

    }

    private areFriends(user1: number, user2: number) {

        return this.graph.get(user1)?.has(user2) ?? false;

    }

    generate(userIds: number[]) {

        console.log("Generating friendship graph...");

        this.initialize(userIds);

        // Pass 1: Every user gets at least 5 friends
        for (const user of userIds) {

            while (this.graph.get(user)!.size < 5) {

                const candidate = sample(userIds);

                if (candidate === user) continue;

                if (this.areFriends(user, candidate)) continue;

                this.addFriend(user, candidate);

            }

        }

        // Pass 2: Triadic Closure
        for (const user of userIds) {

            const friends = [...this.graph.get(user)!];

            if (friends.length === 0) continue;

            const friend = sample(friends);

            const friendsOfFriend = [...this.graph.get(friend)!];

            if (friendsOfFriend.length === 0) continue;

            const candidate = sample(friendsOfFriend);

            if (candidate === user) continue;

            if (this.areFriends(user, candidate)) continue;

            this.addFriend(user, candidate);

        }

    }

    getFriendships(): Friendship[] {

        const friendships: Friendship[] = [];

        for (const [user, friends] of this.graph) {

            for (const friend of friends) {

                if (user < friend) {

                    friendships.push({
                        user1: user,
                        user2: friend
                    });

                }

            }

        }

        return friendships;

    }

}