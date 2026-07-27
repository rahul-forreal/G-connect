import { z } from "zod";

export const sendFriendRequestSchema = z.object({
    senderId: z
        .number({
            error: "senderId must be a number",
        })
        .int("senderId must be an integer")
        .positive("senderId must be positive"),

    receiverId: z
        .number({
            error: "receiverId must be a number",
        })
        .int("receiverId must be an integer")
        .positive("receiverId must be positive"),
});

export const acceptFriendRequestSchema = z.object({
    receiverId: z
        .number({
            error: "receiverId must be a number",
        })
        .int()
        .positive(),
});

export const rejectFriendRequestSchema = z.object({
    receiverId: z
        .number({
            error: "receiverId must be a number",
        })
        .int()
        .positive(),
});

export const cancelFriendRequestSchema = z.object({
    senderId: z
        .number({
            error: "senderId must be a number",
        })
        .int()
        .positive(),
});