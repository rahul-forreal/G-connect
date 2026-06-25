import {User} from "../models/User"

interface Recommendation{
    userId:number;
    score:number;
}
export class SocialGraph{
    private users:Map<number,User>;
    private friendships:Map<number,Set<number>>;
    constructor(){
        this.users=new Map();
        this.friendships=new Map();
    }
    addUser(user:User):void{
        this.users.set(user.id,user);
        this.friendships.set(user.id,new Set());
    }
    addFriend(user1:number,user2:number):void{
        this.friendships.get(user1)?.add(user2);
        this.friendships.get(user2)?.add(user1);
    }
    removeFriend(user1:number,user2:number):void{
        this.friendships.get(user1)?.delete(user2);
        this.friendships.get(user2)?.delete(user1);
    }
    getFriends(userId:number):Set<number>{
        return this.friendships.get(userId) ?? new Set();
    }
    getMutualFriends(user1:number,user2:number):Set<number>{
        const friends1=this.friendships.get(user1);
        const friends2=this.friendships.get(user2);
        if(!friends1 || !friends2)return new Set();
        const mutualFriends=new Set<number>();
        if(friends1.size > friends2.size){
            for(const friend of friends2){
                if(friends1.has(friend)){
                    mutualFriends.add(friend);
                }
            }
        }else{
            for(const friend of friends1){
                if(friends2.has(friend)){
                    mutualFriends.add(friend);
                }
            }
        }
        return mutualFriends;
    }
    getCandidates(userId:number):Set<number>{
        const friendList=this.friendships?.get(userId);
        const candidates=new Set<number>();
        if(!friendList)return new Set();
        for(const friend of friendList){
            const friendOfFriend=this.friendships.get(friend);
            if(!friendOfFriend)continue;
            for(const candiFriend of friendOfFriend){
                candidates.add(candiFriend);
            }
        }
        candidates.delete(userId);
        for(const friend of friendList){
            candidates.delete(friend);
        }
        return candidates;
    }
    getInterestScore(user1Id:number,user2Id:number):number{
        const user1=this.users.get(user1Id);
        const user2=this.users.get(user2Id);
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
    recommendUsers(userId:number):Recommendation[]{
        const candidates=this.getCandidates(userId);
        const recommendations : Recommendation[]=[];
        for(const candidate of candidates){
            const mutualScore=this.getMutualFriends(userId,candidate).size;
            const interestScore=this.getInterestScore(userId,candidate);
            const finalScore=0.7*mutualScore+0.3*interestScore;
            recommendations.push({userId:candidate,score:finalScore});
        }
        recommendations.sort((a,b)=>b.score-a.score);
        return recommendations;
    }
}