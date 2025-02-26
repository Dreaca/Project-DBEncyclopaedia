import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bookRoutes from "./routes/book-routes";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI||"mongodb://localhost:27017/bookList-db");

const PORT = process.env.PORT || 5000;

const db = mongoose.connection;
db.on('error',(error)=>{
    console.log("DB Connection error",error);
})
db.on('open',()=>{
    console.log("DB Connection open");
})

app.use(cors({
    // origin: "http://localhost:8081",
    origin:'true',
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    credentials:true
}))
app.use(express.json());
app.use('/book',bookRoutes)

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})