import {IBook} from "../models/IBook";
import BookSchema from "../models/mongo-schemas/book-schema";
import BookModel from "../models/mongo-schemas/book-schema";
import {IUser} from "../models/IUser";
import UserModel from "../models/mongo-schemas/user-schema";
import bcrypt from "bcryptjs";

export async function BookSave(b:IBook){
    try{
        const newBook = await BookModel.create({
            name:b.name,
            category:b.category,
            owned:b.owned,
        })
        console.log("Book saved ", newBook)
    }catch (err){
        console.log("Error creating BookSave",err);
    }
}
export async function BookFindAll(){
    try {
        return await BookModel.find()
    }catch (err){
        console.log("Error creating BookFindAll",err);
    }
}

export async function UserSave(u:IUser){
    const hashedPassword = await bcrypt.hash(u.password,10)
    try {
        const newUser = await UserModel.create({
            username: u.username,
            password: hashedPassword,
        });
        console.log("User created", newUser);
    }catch (err){
        console.log("Error creating UserSave",err);
    }
}
export async function VerifyUser(u:IUser){
    try {
        const user:IUser|null = await UserModel.findOne({username: u.username})
        if(!user){
            return false
        }
        return await bcrypt.compare(u.password, user.password);
    }catch (err){
        console.log("Error occurred", err)
    }
}