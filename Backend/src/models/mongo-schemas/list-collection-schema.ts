import mongoose = require('mongoose');

const ListCollectionSchema = new mongoose.Schema({
    listId:{ type: String, required: true ,autoIncrement:true },
    userId:{ type: String, required: true },
    listName:{ type: String, required: true },
    votes:{ type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
})

const ListCollectionModel = mongoose.model('ListCollection', ListCollectionSchema);

export default ListCollectionModel;