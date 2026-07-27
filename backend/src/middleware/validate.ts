import { Request, Response, NextFunction } from "express";
import { ZodIssue, ZodSchema } from "zod";
import { BadRequestError } from "../errors/BadRequestError";

export const validate =
    (schema: ZodSchema) =>
    (req: Request, res: Response, next: NextFunction) => {

        const result = schema.safeParse(req.body);

        if (!result.success) {

            const message = result.error.issues
                .map((issue: ZodIssue) => {
                    const field = issue.path.join(".");
                    return field
                        ? `${field}: ${issue.message}`
                        : issue.message;
                })
                .join(", ");

            return next(new BadRequestError(message));
        }

        req.body = result.data;

        next();
    };