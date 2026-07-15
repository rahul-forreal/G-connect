import { Request, Response } from "express";
import { RecommendationService } from "../services/RecommendationService";

export class RecommendationController {
    constructor(
        private recommendationService: RecommendationService
    ) {}

    getRecommendation = async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            const recommendations =
                await this.recommendationService.recommendUsers(
                    Number(req.params.id)
                );

            res.status(200).json(recommendations);
        } catch (error) {
            res.status(400).json({
                error: (error as Error).message
            });
        }
    };
}