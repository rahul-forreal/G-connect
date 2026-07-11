import {Router} from "express"
import {recommendationController} from "../container/container"

const router = Router()

router.get("/user/:id/recommendations",recommendationController.getRecommendation);

export default router;