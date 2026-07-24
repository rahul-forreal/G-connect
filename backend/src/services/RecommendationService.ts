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

    private calculateInterestScore(
        interests1: Set<string>,
        interests2: Set<string>
    ): number {

        if (
            interests1.size === 0 &&
            interests2.size === 0
        ) {
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

        const union =
            interests1.size +
            interests2.size -
            common;

        return common / union;

    }

        private calculateFinalScore(
            mutualScore: number,
            interestScore: number
        ): number {
            return 0.7 * mutualScore + 0.3 * interestScore;
        }

    async recommendUsers(userId: number): Promise<Recommendation[]> {

        const candidates =
            await this.friendshipRepository.getCandidates(userId);

        if (candidates.length === 0) {
            return [];
        }

        const users =
            await this.userRepository.findByIds(candidates);

        const userMap =
            new Map(users.map(u => [u.id, u]));

        const interestMap =
            await this.interestRepository.getUserInterestsMap([
                userId,
                ...candidates,
            ]);

        const mutualCounts =
            await this.friendshipRepository.getMutualFriendCounts(
                userId,
                candidates
            );

        const currentUserInterests =
            interestMap.get(userId) ?? new Set<string>();

        const recommendations: Recommendation[] = [];

        for (const candidateId of candidates) {

            const user = userMap.get(candidateId);

            if (!user) continue;

            const candidateInterests =
                interestMap.get(candidateId) ??
                new Set<string>();

            const interestScore =
                this.calculateInterestScore(
                    currentUserInterests,
                    candidateInterests
                );

            const mutual =
                mutualCounts.get(candidateId) ?? 0;

            recommendations.push({

                user,

                mutualFriends: mutual,

                interestSimilarity: interestScore,

                finalScore:
                    this.calculateFinalScore(
                        mutual,
                        interestScore
                    ),

            });

        }

        recommendations.sort(
            (a, b) => b.finalScore - a.finalScore
        );

        return recommendations;
    }
    }