import {User} from "./User"
export interface Recommendation{
    user:User;
    mutualFriends:number;
    interestSimilarity:number;
    finalScore:number;
}
