import { Request, Response } from "express";
import { FriendshipService } from "../services/FriendshipService";

export class FriendshipController {
    constructor(
        private friendshipService: FriendshipService
    ) {}

    addFriend = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { user1, user2 } = req.body;

            await this.friendshipService.addFriend(
                Number(user1),
                Number(user2)
            );

            res.status(201).json({
                message: "Friendship created successfully"
            });
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };

    removeFriend = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { user1, user2 } = req.body;

            await this.friendshipService.removeFriend(
                Number(user1),
                Number(user2)
            );

            res.status(200).json({
                message: "Friendship removed successfully"
            });
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };

    getFriends = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const friends = await this.friendshipService.getFriends(
                Number(req.params.id)
            );

            res.status(200).json(friends);
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };

    getMutualFriends = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const mutualFriends =
                await this.friendshipService.getMutualFriends(
                    Number(req.params.id),
                    Number(req.params.otherUserId)
                );

            res.status(200).json(mutualFriends);
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };
}