import {State} from "react-native-gesture-handler";
import axios from "axios"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import Book from "../models/Book";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UpdateBookOwnedPayload {
    id: string;
    owned: boolean;
}
const initialState = {
    books : [],
    loading: false,
}
const api = axios.create({
    baseURL: 'http://192.168.254.126:5000/book',
    withCredentials: true
})
export const getAllBooks = createAsyncThunk(
    "/getAllBooks",
    async ()=>{
        try {
            const localCopy = await AsyncStorage.getItem("books");
            if (localCopy) {
                console.log("Local Copy Found ! ")
                return JSON.parse(localCopy);
            }
            else{
                const response = await api.get('/getAll')
                const books = response.data

                await AsyncStorage.setItem("books", JSON.stringify(books));
                return books;
            }
        }catch (err){
            console.log("Error occurred",err)
            throw err
        }
    }
)
export const updateBookOwned = createAsyncThunk(
    "books/updateBookOwned",
    async ({ id, owned }:UpdateBookOwnedPayload) => {
        try {

            const localCopy = await AsyncStorage.getItem("books");
            if (localCopy) {
                const books = JSON.parse(localCopy);
                const bookIndex = books.findIndex((book) => book._id === id);
                if (bookIndex !== -1) {
                    books[bookIndex].owned = owned;
                    await AsyncStorage.setItem("books", JSON.stringify(books));
                }
                return { id, owned };
            }
        } catch (err) {
            console.log("Error occurred while updating book", err);
            throw err;
        }
    }
);
const BookSlice = createSlice({
    name:'book',
    initialState: initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(getAllBooks.fulfilled,(state, action)=>{
                state.books = action.payload
                state.loading = false
            })
            .addCase(getAllBooks.pending,(state, action)=>{
                state.loading = true
            })
            .addCase(getAllBooks.rejected,(state, action)=>{
                console.log("REJECTED BOOKS")
            })
        builder
            .addCase(updateBookOwned.fulfilled, (state, action:PayloadAction<UpdateBookOwnedPayload>) => {
                const { id, owned } = action.payload;
                const book:Book = state.books.find((book:Book) => book._id === id);
                if (book) {
                    book.owned = owned; // Update the state
                }
            });
    }
})
export default BookSlice.reducer