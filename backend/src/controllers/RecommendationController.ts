import {Request, Response} from "express"
import {RecommendationService} from "../services/RecommendationService"

export class RecommendationController{
    constructor(private recommendationService : RecommendationService){}
    getRecommendation = (req: Request, res: Response):void=>{
        try{
            const recommendations = this.recommendationService.recommendUsers(Number(req.params.id));
            res.status(200).json(recommendations);
        }catch(error){
            res.status(400).json({error:(error as Error).message});
        }
    };
}