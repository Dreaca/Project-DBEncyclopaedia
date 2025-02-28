import express from "express";
import {IUser} from "../models/IUser";
import UserModel from "../models/mongo-schemas/user-schema";
import bcrypt from "bcryptjs";
import {UserSave, VerifyUser} from "../database/mongo-data-store";
import jwt, {Secret} from 'jsonwebtoken'

const router = express.Router();

router.post("/register", async (req, res) => {
    const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password

    const user : IUser = {userId,username, password};

    const existing = await UserModel.findOne({ username: username });
    if (existing){
        res.status(409).send("User already exists");
    }else{
        try{
            const registration =   await UserSave(user)
            res.status(200).send(registration)
        }catch(error){
            res.status(500).send("An Error occurred while creating user" + error);
        }
    }
})
router.post("/login", async (req:express.Request, res:express.Response) => {
    const userId = req.body.userId;
    const username = req.body.username;
    const password = req.body.password

    const verifyUser:IUser = {userId,username, password};
    try{
        const verified = await VerifyUser(verifyUser);

        if (verified) {
            const token = jwt.sign({username}, process.env.SECRET_KEY as Secret, {expiresIn: '1h'});
            const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN as Secret, {expiresIn: '7d'});
            res.json({accessToken: token, refreshToken: refreshToken})
        } else {
            res.status(401).send("Invalid Credentials");
        }
    }catch (err){
        console.log(err)
        res.status(400).send(err);
    }
})
router.post("/refresh-token", async (req:express.Request, res:express.Response) => {
    const authHeader = req.headers.authorization;
    const refresh_token = authHeader?.split(' ')[1];

    if(!refresh_token)res.status(401).send('No token provided');

    try{
        const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
        const token = jwt.sign({ username: payload.username }, process.env.SECRET_KEY as Secret, {expiresIn: "1h"});
        res.json({accessToken : token});
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})

export default router;