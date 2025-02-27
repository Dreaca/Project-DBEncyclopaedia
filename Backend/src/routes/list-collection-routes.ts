import express = require('express');
import {
    DeleteCustomListName,
    GetAllCustomListNames,
    GetOneCustomList,
    SaveCustomListName,
    UpdateCustomListName
} from "../database/mongo-data-store";

const router = express.Router();

router.get('/getAll', async (req: express.Request, res: express.Response) => {
    try{
        const customLists = await GetAllCustomListNames()
        res.json(customLists)
    }catch(err){
        res.status(500).send({message:'Error getting all data'+err});
    }
})
router.get('/getOne/:id', async (req: express.Request, res: express.Response) => {
    const listId = req.params.id;
    try{
        const customList = await GetOneCustomList(listId)
        res.json(customList)
    }catch (err){
        res.status(500).send("Something went wrong!"+err)
    }
})
router.post('/add', async (req: express.Request, res: express.Response) => {
    const list = req.body;
    try{
        const save = await SaveCustomListName(list)
        res.status(200).send("Custom List name saved")
    }catch(err) {
        res.status(500).send("Something went wrong!"+err)
    }
})
router.put('/update/:id',async (req: express.Request, res: express.Response) => {
    const updateListName = req.body
    const listId = req.params.id;
    try{
        const update = await UpdateCustomListName(listId,updateListName)
        res.status(200).send("Custom List name saved")
    }catch (err){
        res.status(500).send("Something went wrong!"+err)
    }
})
router.delete('/delete/:id',async (req: express.Request, res: express.Response) => {
    const id = req.params.id;
    try {
        await DeleteCustomListName(id)
        res.status(200).send("List deleted!")
    }catch (err){
        res.status(500).send("Something went wrong!"+err)
    }
})
export default router