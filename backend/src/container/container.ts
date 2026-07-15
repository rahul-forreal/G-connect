import { UserService } from "../services/UserServices";
import { RecommendationService } from "../services/RecommendationService";
import { FriendshipService } from "../services/FriendshipService";

import { UserController } from "../controllers/UserController";
import { FriendshipController } from "../controllers/FriendshipController";
import { RecommendationController } from "../controllers/RecommendationController";

import { UserRepository } from "../repositories/UserRepository";
import { FriendshipRepository } from "../repositories/FriendshipRepository";

const userRepository = new UserRepository();
const friendshipRepository = new FriendshipRepository();

const userService = new UserService(userRepository);

const friendshipService = new FriendshipService(
    friendshipRepository,userRepository
);

const recommendationService = new RecommendationService(
    userRepository,
    friendshipRepository
);

const userController = new UserController(userService);

const friendshipController = new FriendshipController(
    friendshipService
);

const recommendationController = new RecommendationController(
    recommendationService
);

export {
    userRepository,
    friendshipRepository,
    userService,
    friendshipService,
    recommendationService,
    userController,
    friendshipController,
    recommendationController
};