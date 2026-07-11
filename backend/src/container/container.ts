import {SocialGraph} from "../services/SocialGraph"
import {UserService} from "../services/UserServices"
import {RecommendationService} from "../services/RecommendationService"
import {UserController} from "../controllers/UserController"
import { FriendshipService } from "../services/FriendshipService";
import { FriendshipController } from "../controllers/FriendshipController";
import {RecommendationController} from "../controllers/RecommendationController"

const graph=new SocialGraph();
const userService = new UserService(graph);
const userController = new UserController(userService);
const recommendationService = new RecommendationService(graph);
const friendshipService = new FriendshipService(graph);
const friendshipController = new FriendshipController(friendshipService);
const recommendationController = new RecommendationController(recommendationService);

export{graph,userService,recommendationService,friendshipService,userController,friendshipController,recommendationController};