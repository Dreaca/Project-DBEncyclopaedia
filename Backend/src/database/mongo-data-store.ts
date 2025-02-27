import {Book} from "../models/Book";
import BookSchema from "../models/book-schema";
import BookModel from "../models/book-schema";

export async function BookSave(b:Book){
    try{
        const newBook = await BookModel.create({
            name:b.name,
            category:b.category,
            owned:b.owned,
        })
        return newBook;
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