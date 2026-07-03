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
graph.addUser(rahul);
graph.addUser(alex);
graph.addUser(maxi);
graph.addUser(alpha);
graph.addFriend(1,2);
graph.addFriend(3,4);
graph.addFriend(1,3);
graph.addFriend(2,3);
console.log(graph.getFriends(1));
console.log(graph.getFriends(3));
console.log(graph.getMutualFriends(1,2));
console.log(graph.getMutualFriends(1,4));
console.log(graph.getCandidates(1));
console.log("....................");
console.log(recommendationService.recommendUsers(4))
