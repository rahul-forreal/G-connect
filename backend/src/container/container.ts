import { UserService } from "../services/UserServices";
import { RecommendationService } from "../services/RecommendationService";
import { FriendshipService } from "../services/FriendshipService";

import { UserController } from "../controllers/UserController";
import { FriendshipController } from "../controllers/FriendshipController";
import { RecommendationController } from "../controllers/RecommendationController";

import { UserRepository } from "../repositories/UserRepository";
import { FriendshipRepository } from "../repositories/FriendshipRepository";
import { InterestRepository } from "../repositories/InterestRepository";

import { FriendRequestRepository } from "../repositories/FriendRequestRepository";
import { FriendRequestService } from "../services/FriendRequestService";
import { FriendRequestController } from "../controllers/FriendRequestController";

const userRepository = new UserRepository();
const friendshipRepository = new FriendshipRepository();
const interestRepository = new InterestRepository();
const friendRequestRepository = new FriendRequestRepository();

const userService = new UserService(
    userRepository,
    interestRepository
);

const friendshipService = new FriendshipService(
    friendshipRepository,userRepository
);

const recommendationService = new RecommendationService(
    userRepository,
    friendshipRepository,
    interestRepository
);

const friendRequestService = new FriendRequestService(
    friendRequestRepository,
    friendshipRepository,
    userRepository
);

const userController = new UserController(userService);

const friendshipController = new FriendshipController(
    friendshipService
);

const recommendationController = new RecommendationController(
    recommendationService
);

const friendRequestController = new FriendRequestController(
    friendRequestService
);

export {
    userRepository,
    friendshipRepository,
    interestRepository,
    userService,
    friendshipService,
    recommendationService,
    userController,
    friendshipController,
    recommendationController,
    friendRequestRepository,
    friendRequestService,
    friendRequestController
};