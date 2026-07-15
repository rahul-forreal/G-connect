import { User } from "@prisma/client";

export interface Recommendation {
    user: User;
    mutualFriends: number;
    interestSimilarity: number;
    finalScore: number;
}