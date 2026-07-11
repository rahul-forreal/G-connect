import express from "express";
import userRoutes from "./routes/UserRoutes";
import friendshipRoutes from "./routes/FriendshipRoutes";
import recommendationRoutes from "./routes/RecommendationRoutes"

const app = express();

app.use(express.json());
app.use(userRoutes);
app.use(friendshipRoutes);
app.use(recommendationRoutes);

export default app;