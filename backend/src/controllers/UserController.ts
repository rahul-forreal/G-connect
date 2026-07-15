import { Request, Response } from "express";
import { UserService } from "../services/UserServices";

export class UserController {
    constructor(
        private userService: UserService
    ) {}

    createUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const { name, email } = req.body;

            await this.userService.createUser(
                name,
                email
            );

            res.status(201).json({
                message: "User created successfully"
            });
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };

    getUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const user = await this.userService.getUser(
                Number(req.params.id)
            );

            res.status(200).json(user);
        } catch (error) {
            res.status(404).json({
                error: (error as Error).message
            });
        }
    };

    getAllUsers = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const users = await this.userService.getAllUsers();

            res.status(200).json(users);
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };

    updateUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const user = await this.userService.updateUser(
                Number(req.params.id),
                req.body
            );

            res.status(200).json(user);
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };

    deleteUser = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            await this.userService.deleteUser(
                Number(req.params.id)
            );

            res.status(200).json({
                message: "User deleted successfully"
            });
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };
}