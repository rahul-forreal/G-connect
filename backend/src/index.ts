import {SocialGraph} from "./services/SocialGraph"
import {User} from "./models/User"

console.log("Graph recommendation system started");
const graph=new SocialGraph();
const rahul=new User(1,"rahul","rahul@gmail.com");
const alex=new User(2,"alex","alex@gmail.com");
graph.addUser(rahul);
graph.addUser(alex);
graph.addFriend(1,2);
console.log(graph.getFriends(1));
