import { UserRepository } from "../repositories/UserRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {}

    async createUser(name: string, email: string): Promise<void> {
        const existing = await this.userRepository.findByEmail(email);

        if (existing) {
            throw new Error("User already exists");
        }

        await this.userRepository.create(name, email);
    }

    async getUser(id: number) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    async getAllUsers() {
        return await this.userRepository.findAll();
    }

    async updateUser(
        id: number,
        data: {
            name?: string;
            email?: string;
        }
    ) {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        return await this.userRepository.update(id, data);
    }

    async deleteUser(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);

        if (!user) {
            throw new Error("User not found");
        }

        await this.userRepository.delete(id);
    }
}