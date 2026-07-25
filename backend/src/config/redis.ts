import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
    throw new Error("REDIS_URL is not defined");
}

const redis = createClient({
    url: redisUrl,
});

redis.on("error", (err) => {
    console.error("Redis Error:", err);
});

export async function connectRedis() {
    if (!redis.isOpen) {
        await redis.connect();
        console.log("✅ Redis Connected");
    }
}

export default redis;