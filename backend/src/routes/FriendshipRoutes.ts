import { Router } from "express";
import { friendshipController } from "../container/container";

const router = Router();

router.post("/friends", friendshipController.addFriend);

router.delete("/friends", friendshipController.removeFriend);

router.get("/users/:id/friends", friendshipController.getFriends);

router.get(
    "/users/:id/mutual/:otherUserId",
    friendshipController.getMutualFriends
);

export default router;