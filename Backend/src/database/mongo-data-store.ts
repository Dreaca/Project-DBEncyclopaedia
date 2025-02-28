import {IBook} from "../models/IBook";
import BookModel from "../models/mongo-schemas/book-schema";
import {IUser} from "../models/IUser";
import UserModel from "../models/mongo-schemas/user-schema";
import bcrypt from "bcryptjs";
import {IListCollection} from "../models/IListCollection";
import ListCollectionModel from "../models/mongo-schemas/list-collection-schema";
import CustomItemModel from "../models/mongo-schemas/custom-item-schema";

//Book Functions
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
//User Functions
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
//ListCollection function
export async function SaveCustomListName(lc:IListCollection){
    try {
        const newList = await ListCollectionModel.create({
            listId:lc.listId,
            userId: lc.userId,
            listName: lc.listName,
            votes:0,
            createdAt:new Date()
        });
        if (lc.customItems && lc.customItems.length > 0) {
            const itemsToSave = lc.customItems.map((item) => ({
                listId: lc.listId,
                itemName: item.itemName,
                status: item.status,
                extra: item.extra
            }));

            await CustomItemModel.insertMany(itemsToSave);
            console.log("Custom Items Saved!");
        }
        console.log("Custom List Saved!")
    }catch (err){
        console.log("Error creating ListName",err);
    }
}
export async function DeleteCustomListName(listId:string){
    try{
        await ListCollectionModel.deleteOne({listId:listId});
        console.log("List deletion successful")
    }catch (err){
        console.log("Could not delete ListName",err);
    }
}
export async function UpdateCustomListName(listId: string, lc: IListCollection) {
    try {
        const update = await ListCollectionModel.updateOne(
            { listId: listId },
            {
                listName: lc.listName,
                userId: lc.userId,
                votes: lc.votes,
                createdAt: new Date(),
            }
        );

        if (lc.customItems && lc.customItems.length > 0) {
            const bulkOps = lc.customItems.map((item) => ({
                updateOne: {
                    filter: { listId: lc.listId, itemName: item.itemName },
                    update: {
                        $set: {
                            status: item.status,
                            extra: item.extra,
                        },
                    },
                    upsert: true, 
                },
            }));

            await CustomItemModel.bulkWrite(bulkOps);
        }
    } catch (err) {
        console.log("Error updating list name ", err);
    }
}

export async function GetAllCustomListNames() {
    try {

        const lists = await ListCollectionModel.find();

        return await Promise.all(
            lists.map(async (list) => {
                const customItems = await CustomItemModel.find({listId: list.listId});
                return {...list.toObject(), customItems};
            })
        );
    } catch (err) {
        console.log("Error loading list names", err);
        throw err;
    }
}

export async function GetOneCustomList(listId:string){
    try{
        return await ListCollectionModel.findOne({listId: listId})
    }catch (err){
        console.log("Error loading list with id "+listId)
    }
}