import express from "express";
 const app=express();
 app.use(express.json());
 app.get("/",(req,res)=>{
    res.json({
        message:"Graph recommendation engine API"
    });
 });
 export default app;