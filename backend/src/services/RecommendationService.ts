import { UserRepository } from "../repositories/UserRepository";
import { FriendshipRepository } from "../repositories/FriendshipRepository";
import { Recommendation } from "../models/Recommendation";

export class RecommendationService {
    constructor(
        private userRepository: UserRepository,
        private friendshipRepository: FriendshipRepository
    ) {}

    async recommendUsers(userId: number): Promise<Recommendation[]> {
        const candidates = await this.friendshipRepository.getCandidates(userId);

        const recommendations: Recommendation[] = [];

        for (const candidate of candidates) {
            const user = await this.userRepository.findById(candidate);

            if (!user) {
                continue;
            }

            const mutualFriends = await this.friendshipRepository.getMutualFriends(
                userId,
                candidate
            );

            recommendations.push({
                user,
                mutualFriends: mutualFriends.length,
                interestSimilarity: 0,
                finalScore: mutualFriends.length,
            });
        }

        recommendations.sort((a, b) => b.finalScore - a.finalScore);

        return recommendations;
    }
}