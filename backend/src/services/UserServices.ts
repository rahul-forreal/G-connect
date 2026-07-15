import { UserRepository } from "../repositories/UserRepository";
import { InterestRepository } from "../repositories/InterestRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository,
        private interestRepository: InterestRepository
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

    async addInterest(
        userId: number,
        interestName: string
    ): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        await this.interestRepository.addInterest(
            userId,
            interestName
        );
    }

    async removeInterest(
        userId: number,
        interestName: string
    ): Promise<void> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        await this.interestRepository.removeInterest(
            userId,
            interestName
        );
    }

    async getUserInterests(userId: number): Promise<Set<string>> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new Error("User not found");
        }

        return await this.interestRepository.getUserInterests(userId);
    }
}