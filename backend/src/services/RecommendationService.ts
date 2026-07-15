import { UserRepository } from "../repositories/UserRepository";
import { FriendshipRepository } from "../repositories/FriendshipRepository";
import { InterestRepository } from "../repositories/InterestRepository";
import { Recommendation } from "../models/Recommendation";

export class RecommendationService {
    constructor(
        private userRepository: UserRepository,
        private friendshipRepository: FriendshipRepository,
        private interestRepository: InterestRepository
    ) {}

    private async calculateInterestScore(
        user1Id: number,
        user2Id: number
    ): Promise<number> {
        const interests1 =
            await this.interestRepository.getUserInterests(user1Id);

        const interests2 =
            await this.interestRepository.getUserInterests(user2Id);

        if (interests1.size === 0 && interests2.size === 0) {
            return 0;
        }

        let common = 0;

        const smaller =
            interests1.size <= interests2.size
                ? interests1
                : interests2;

        const larger =
            interests1.size <= interests2.size
                ? interests2
                : interests1;

        for (const interest of smaller) {
            if (larger.has(interest)) {
                common++;
            }
        }

        const unionSize =
            interests1.size + interests2.size - common;

        return common / unionSize;
    }

    private calculateFinalScore(
        mutualScore: number,
        interestScore: number
    ): number {
        return 0.7 * mutualScore + 0.3 * interestScore;
    }

    async recommendUsers(
        userId: number
    ): Promise<Recommendation[]> {
        const candidates =
            await this.friendshipRepository.getCandidates(userId);

        const recommendations: Recommendation[] = [];

        for (const candidate of candidates) {
            const user = await this.userRepository.findById(candidate);

            if (!user) {
                continue;
            }

            const mutualFriends =
                await this.friendshipRepository.getMutualFriends(
                    userId,
                    candidate
                );

            const interestScore =
                await this.calculateInterestScore(
                    userId,
                    candidate
                );

            const finalScore = this.calculateFinalScore(
                mutualFriends.length,
                interestScore
            );

            recommendations.push({
                user,
                mutualFriends: mutualFriends.length,
                interestSimilarity: interestScore,
                finalScore
            });
        }

        recommendations.sort(
            (a, b) => b.finalScore - a.finalScore
        );

        return recommendations;
    }
}