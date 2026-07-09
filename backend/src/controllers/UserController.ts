import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {
    constructor(private userService: UserService) {}

    createUser = (req: Request, res: Response): void => {
        try {
            const { id, name, email } = req.body;

            this.userService.createUser(id, name, email);

            res.status(201).json({
                message: "User created successfully"
            });
        } catch (error) {
            res.status(409).json({
                error: (error as Error).message
            });
        }
    };

    getAllUsers = (_req: Request, res: Response): void => {
        res.status(200).json(this.userService.getAllUsers());
    };

    getUser = (req: Request, res: Response): void => {
        const user = this.userService.getUser(Number(req.params.id));

        if (!user) {
            res.status(404).json({
                error: "User not found"
            });
            return;
        }

        res.status(200).json(user);
    };

    updateUser = (req: Request, res: Response): void => {
        try {
            this.userService.updateUser(
                Number(req.params.id),
                req.body
            );

            res.status(200).json({
                message: "User updated successfully"
            });
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    deleteUser = (req: Request, res: Response): void => {
        try {
            this.userService.deleteUser(Number(req.params.id));

            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    addInterest = (req: Request, res: Response): void => {
        try {
            this.userService.addInterest(
                Number(req.params.id),
                req.body.interest
            );

            res.status(200).json({
                message: "Interest added successfully"
            });
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    removeInterest = (req: Request, res: Response): void => {
        try {
            this.userService.removeInterest(
                Number(req.params.id),
                req.body.interest
            );

            res.status(200).json({
                message: "Interest removed successfully"
            });
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };
}