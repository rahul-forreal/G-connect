import { faker } from "@faker-js/faker";

export interface GeneratedUser {
    name: string;
    email: string;
}

export class UserGenerator {

    generate(count: number): GeneratedUser[] {

        const users: GeneratedUser[] = [];

        for (let i = 1; i <= count; i++) {

            const first = faker.person.firstName();
            const last = faker.person.lastName();

            users.push({
                name: `${first} ${last}`,
                email: `${first.toLowerCase()}.${last.toLowerCase()}.${i}@example.com`
            });

        }

        return users;

    }

}