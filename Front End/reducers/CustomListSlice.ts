
import axios from "axios";
import {combineReducers, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import CustomItem from "../models/CustomItem";
import CustomLists from "../models/CustomLists";

const initialState:any = {
    customLists:[]
}
const api = axios.create({
    baseURL:"http://192.168.254.126:5000/customLists",
    withCredentials:true
})
export const getAllCustomLists= createAsyncThunk(
    'customList/getAllCustomLists',
    async ()=>{
       try {
           const response = await api.get('/getAll')
           return response.data
       }catch (err){
           console.log(err)
       }
    }
)
export const getOncCustomList = createAsyncThunk(
    'customList/getOncCustomList',
    async (id:string)=>{
        try {
            const response = await api.get(`/getOne/${id}`)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const saveCustomList = createAsyncThunk(
    'customList/saveCustomList',
    async (list:CustomLists)=>{
        try {
            const response = await api.post('/add',list)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const updateCustomList = createAsyncThunk(
    'customList/updateCustomList',
    async (list:CustomLists)=>{
        try{
            const response = await api.put(`/update/${list.listId}`,list)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
export const deleteCustomList = createAsyncThunk(
    'customList/deleteCustomList',
    async (id:string)=>{
        try {
            const response = await api.delete(`/delete/${id}`)
            return response.data
        }catch (err){
            console.log(err)
        }
    }
)
const CustomListSlice = createSlice({
    name:"customList",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(saveCustomList.fulfilled,(state, action)=>{
               alert("Custom List Saved successfully")
            })
            .addCase(saveCustomList.pending,(state,action)=>{
                console.log("Save Pending")
            })
            .addCase(saveCustomList.rejected,(state, action)=>{
                alert("List saving failed. Please try again!")
            })
        builder
            .addCase(getAllCustomLists.fulfilled,(state, action)=>{
                state.customLists = action.payload
            })
            .addCase(getAllCustomLists.pending,(state,action)=>{
                console.log("Lists pending")
            })
            .addCase(getAllCustomLists.rejected,(state, action)=>{
                alert("List loading failed. Please try again")
            })
    }
})
export default CustomListSlice.reducer