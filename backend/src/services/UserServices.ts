import { User } from "../models/User";
import { SocialGraph } from "./SocialGraph";

export class UserService {
    constructor(private graph: SocialGraph) {}

    createUser(id: number, name: string, email: string): void {
        if (this.graph.getUser(id)) {
            throw new Error("User already exists");
        }

        const user = new User(id, name, email);
        this.graph.addUser(user);
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