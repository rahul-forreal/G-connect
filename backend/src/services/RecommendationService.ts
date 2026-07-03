import {SocialGraph} from "./SocialGraph"
import {Recommendation} from "../models/Recommendation"
export class RecommendationService{
    constructor(
        private graph:SocialGraph
    ){}
    calculateInterestScore(user1Id:number,user2Id:number):number{
        const user1=this.graph.getUser(user1Id);
        const user2=this.graph.getUser(user2Id);
        const interests1=user1?.getInterests();
        const interests2=user2?.getInterests();
        if(!interests1 || !interests2)return 0;
        let common=0;
        if(interests1.size > interests2.size){
            for(const interest of interests2){
                if(interests1.has(interest))common=common+1;
            }
        }else{
            for(const interest of interests1){
                if(interests2.has(interest))common=common+1;
            }
        }
        const union=new Set<string>;
        for(const interest of interests1){
            union.add(interest);
        }
        for(const interest of interests2){
            union.add(interest);
        }
        return common/union.size;
    }
    private calculateFinalScore(mutualScore:number,interestScore:number):number{
        const finalScore=0.7*mutualScore+0.3*interestScore;
        return finalScore;
    }
    recommendUsers(userId:number):Recommendation[]{
        const candidates=this.graph.getCandidates(userId);
        const recommendations : Recommendation[]=[];
        for(const candidate of candidates){
            const user=this.graph.getUser(candidate);
            if(!user)continue;
            const mutualScore=this.graph.getMutualFriends(userId,candidate).size;
            const interestScore=this.calculateInterestScore(userId,candidate);
            const finalScore=this.calculateFinalScore(mutualScore,interestScore);
            recommendations.push({user,mutualFriends:mutualScore,interestSimilarity:interestScore,finalScore});
        }
        recommendations.sort((a,b)=>b.finalScore-a.finalScore);
        return recommendations;
    }
}