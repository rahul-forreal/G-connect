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
}