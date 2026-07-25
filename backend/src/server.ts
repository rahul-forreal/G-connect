import "dotenv/config";
import app from "./app";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await connectRedis();

        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();