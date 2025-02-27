import mongoose = require('mongoose');

const BookSchema = new mongoose.Schema(
    {
        id:{type:Number, required: true,unique:true,autoIncrement:true},
        name:{type:String, required: true},
        category:{type:String, required: true},
        owned:{type:Boolean, default: false},
    },
    { timestamps: true }
)
const BookModel = mongoose.model('Book', BookSchema);

export default BookModel;