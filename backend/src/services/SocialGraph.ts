import {User} from "../models/User"

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
    getUser(userId:number):User|undefined{
        return this.users.get(userId);
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
}