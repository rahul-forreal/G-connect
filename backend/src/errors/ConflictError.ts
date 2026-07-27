import { AppError } from "./AppError";

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, 409);
    }
}