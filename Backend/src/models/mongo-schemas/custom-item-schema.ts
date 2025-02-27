import mongoose from 'mongoose';

const CustomItemSchema = new mongoose.Schema({
    listId: {
        type: String,
        ref: 'ListCollection',
        required: true
    },
    itemName: { type: String, required: true },
    status: { type: Boolean, default: false },
    extra: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

const CustomItemModel = mongoose.model('CustomItem', CustomItemSchema);

export default CustomItemModel;
