import { User } from "../models/User";
import { SocialGraph } from "./SocialGraph";
import {UserRepository} from "../repositories/UserRepository"

export class UserService {
    constructor(private graph: SocialGraph,private userRepository: UserRepository) {}

    async createUser(
        name: string,
        email: string
    ): Promise<void> {

        const existing =
            await this.userRepository.findByEmail(email);

        if (existing) {
            throw new Error("User already exists");
        }

        await this.userRepository.create(
            name,
            email
        );
    }
    getUser(userId: number): User | undefined {
        return this.graph.getUser(userId);
    }

    getAllUsers(): User[] {
        return this.graph.getAllUsers();
    }

    updateUser(
        userId: number,
        updates: Partial<Pick<User, "name" | "email">>
    ): void {
        this.graph.updateUser(userId, updates);
    }

    deleteUser(userId: number): void {
        this.graph.removeUser(userId);
    }

    addInterest(userId: number, interest: string): void {
        const user = this.graph.getUser(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.addInterest(interest);
    }

    removeInterest(userId: number, interest: string): void {
        const user = this.graph.getUser(userId);

        if (!user) {
            throw new Error("User not found");
        }

        user.removeInterest(interest);
    }
}