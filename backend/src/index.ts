import {SocialGraph} from "./services/SocialGraph"
import {User} from "./models/User"
import {RecommendationService} from "./services/RecommendationService"

console.log("Graph recommendation system started");

const graph=new SocialGraph();

const recommendationService = new RecommendationService(graph);

const rahul=new User(1,"rahul","rahul@gmail.com");
const alex=new User(2,"alex","alex@gmail.com");
const maxi=new User(3,"maxi","maxi@gmail.com");
const alpha=new User(4,"alpha","alpha@gmail.com");
const jimmy=new User(5,"jimmy","jimmy@gmail.com");
const gus=new User(6,"gus","gus@gmail.com");
const mike=new User(7,"mike","mike@gmail.com");
const saul=new User(8,"saul","saul@gmail.com");
const nacho=new User(9,"nacho","nacho@gmail.com");
const kim=new User(10,"kim","kim@gmail.com");

graph.addUser(rahul);
graph.addUser(alex);
graph.addUser(maxi);
graph.addUser(alpha);
graph.addUser(jimmy);
graph.addUser(gus);
graph.addUser(mike);
graph.addUser(saul);
graph.addUser(nacho);
graph.addUser(kim);

graph.addFriend(1,2);
graph.addFriend(3,4);
graph.addFriend(1,3);
graph.addFriend(2,3);
graph.addFriend(2,5);
graph.addFriend(2,6);
graph.addFriend(3,7);
graph.addFriend(4,5);
graph.addFriend(4,8);
graph.addFriend(5,9);
graph.addFriend(6,7);
graph.addFriend(6,10);
graph.addFriend(7,8);
graph.addFriend(8,9);
graph.addFriend(9,10);

rahul.addInterest("AI");
rahul.addInterest("Backend");
rahul.addInterest("Movies");

alex.addInterest("AI");
alex.addInterest("Backend");
alex.addInterest("Football");

maxi.addInterest("AI");
maxi.addInterest("Backend");
maxi.addInterest("Music");

alpha.addInterest("Backend");
alpha.addInterest("Cloud");
alpha.addInterest("Movies");

jimmy.addInterest("AI");
jimmy.addInterest("Cricket");
jimmy.addInterest("Music");

gus.addInterest("Backend");
gus.addInterest("Cloud");
gus.addInterest("Football");

mike.addInterest("AI");
mike.addInterest("Backend");
mike.addInterest("Cricket");

saul.addInterest("Movies");
saul.addInterest("Cloud");
saul.addInterest("Music");

nacho.addInterest("AI");
nacho.addInterest("Football");
nacho.addInterest("Cricket");

kim.addInterest("Backend");
kim.addInterest("Movies");
kim.addInterest("Music");

console.log(graph.getFriends(1));
console.log(graph.getFriends(3));
console.log(graph.getMutualFriends(1,2));
console.log(graph.getMutualFriends(1,4));
console.log(graph.getCandidates(1));
console.log("....................");
const recommendations=recommendationService.recommendUsers(1);
for(const recommend of recommendations){
    console.log(".............................");
    console.log("Name:",recommend.user.name);
    console.log("Score:",recommend.finalScore);
    console.log("Mutual Friends:",recommend.mutualFriends);
    console.log("Interest Similarity:",recommend.interestSimilarity); 
}
