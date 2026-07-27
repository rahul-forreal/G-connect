import express from "express";
import "dotenv/config";
import userRoutes from "./routes/UserRoutes";
import friendshipRoutes from "./routes/FriendshipRoutes";
import recommendationRoutes from "./routes/RecommendationRoutes"
import friendRequestRoutes from "./routes/FriendRequestRoutes";
import { errorHandler } from "./middleware/errorHandler";


const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(friendshipRoutes);
app.use(recommendationRoutes);
app.use("/friend-requests", friendRequestRoutes);
app.use(errorHandler);

export default app;