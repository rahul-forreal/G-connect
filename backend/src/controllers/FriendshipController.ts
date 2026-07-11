import { Request, Response } from "express";
import { FriendshipService } from "../services/FriendshipService";

export class FriendshipController {
    constructor(private friendshipService: FriendshipService) {}

    addFriend = (req: Request, res: Response): void => {
        try {
            const { user1, user2 } = req.body;

            this.friendshipService.addFriend(user1, user2);

            res.status(201).json({
                message: "Friend added successfully"
            });
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    removeFriend = (req: Request, res: Response): void => {
        try {
            const { user1, user2 } = req.body;

            this.friendshipService.removeFriend(user1, user2);

            res.status(200).json({
                message: "Friend removed successfully"
            });
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    getFriends = (req: Request, res: Response): void => {
        try {
            const friends = this.friendshipService.getFriends(
                Number(req.params.id)
            );

            res.status(200).json(friends);
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    getMutualFriends = (req: Request, res: Response): void => {
        try {
            const mutualFriends = this.friendshipService.getMutualFriends(
                Number(req.params.id),
                Number(req.params.otherUserId)
            );

            res.status(200).json(mutualFriends);
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };
}