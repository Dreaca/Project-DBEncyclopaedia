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
        console.log("Book Added")
        return newBook;
    }catch (err){
        console.log("Error creating BookSave",err);
    }
}