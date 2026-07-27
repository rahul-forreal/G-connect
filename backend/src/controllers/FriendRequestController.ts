import { Request, Response } from "express";
import { FriendRequestService } from "../services/FriendRequestService";

export class FriendRequestController {

    constructor(
        private friendRequestService: FriendRequestService
    ) {}

    async sendRequest(req: Request, res: Response) {

        const { senderId, receiverId } = req.body;

        const request =
            await this.friendRequestService.sendRequest(
                Number(senderId),
                Number(receiverId)
            );

        res.status(201).json(request);

    }

    async getIncomingRequests(req: Request, res: Response) {

        const userId = Number(req.params.userId);

        const requests =
            await this.friendRequestService.getIncomingRequests(
                userId
            );

        res.json(requests);

    }

    async getOutgoingRequests(req: Request, res: Response) {

        const userId = Number(req.params.userId);

        const requests =
            await this.friendRequestService.getOutgoingRequests(
                userId
            );

        res.json(requests);

    }

    async acceptRequest(req: Request, res: Response) {

        await this.friendRequestService.acceptRequest(
            Number(req.params.id),
            Number(req.body.receiverId)
        );

        res.json({
            message: "Friend request accepted"
        });

    }

    async rejectRequest(req: Request, res: Response) {

        await this.friendRequestService.rejectRequest(
            Number(req.params.id),
            Number(req.body.receiverId)
        );

        res.json({
            message: "Friend request rejected"
        });

    }

    async cancelRequest(req: Request, res: Response) {

        await this.friendRequestService.cancelRequest(
            Number(req.params.id),
            Number(req.body.senderId)
        );

        res.json({
            message: "Friend request cancelled"
        });

    }

}