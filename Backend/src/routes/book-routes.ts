import express from "express";
import {BookFindAll} from "../database/mongo-data-store";

const router = express.Router();

router.get('/getAll',async (req: express.Request, res: express.Response) => {
    console.log("Request Received")
    try{
        const books = await BookFindAll()
        res.json(books)
    }catch(err){
        res.status(500).send("Something went wrong");
    }
})

export default router;