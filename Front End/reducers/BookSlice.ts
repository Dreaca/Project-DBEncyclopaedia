import {State} from "react-native-gesture-handler";
import axios from "axios"
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Book from "../models/Book";


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
            const response = await api.get('/getAll')
            return response.data
        }catch (err){
            console.log("Error occurred",err)
        }
    }
)
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
    }
})
export default BookSlice.reducer