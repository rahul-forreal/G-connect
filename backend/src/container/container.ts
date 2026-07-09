import {SocialGraph} from "../services/SocialGraph"
import {UserService} from "../services/UserServices"
import {RecommendationService} from "../services/RecommendationService"
import {UserController} from "../controllers/UserController"

const graph=new SocialGraph();
const userService = new UserService(graph);
const userController = new UserController(userService);
const recommendationService = new RecommendationService(graph);

export{graph,userService,recommendationService,userController};