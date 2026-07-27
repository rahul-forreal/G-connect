import { Router } from "express";

import { friendRequestController } from "../container/container";

import { asyncHandler } from "../utils/asyncHandler";
import { validate } from "../middleware/validate";

import {
    sendFriendRequestSchema,
    acceptFriendRequestSchema,
    rejectFriendRequestSchema,
    cancelFriendRequestSchema,
} from "../validations/friendRequest.validation";

const router = Router();

router.post(
    "/",
    validate(sendFriendRequestSchema),
    asyncHandler(
        friendRequestController.sendRequest.bind(friendRequestController)
    )
);

router.get(
    "/incoming/:userId",
    asyncHandler(
        friendRequestController.getIncomingRequests.bind(friendRequestController)
    )
);

router.get(
    "/outgoing/:userId",
    asyncHandler(
        friendRequestController.getOutgoingRequests.bind(friendRequestController)
    )
);

router.patch(
    "/:id/accept",
    validate(acceptFriendRequestSchema),
    asyncHandler(
        friendRequestController.acceptRequest.bind(friendRequestController)
    )
);

router.patch(
    "/:id/reject",
    validate(rejectFriendRequestSchema),
    asyncHandler(
        friendRequestController.rejectRequest.bind(friendRequestController)
    )
);

router.delete(
    "/:id",
    validate(cancelFriendRequestSchema),
    asyncHandler(
        friendRequestController.cancelRequest.bind(friendRequestController)
    )
);

export default router;