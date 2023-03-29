
import mongoose from 'mongoose';
const { Schema } = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        require: true
    },
}, {
    timestamps: true
});

export const Categories = mongoose.model('categories', categorySchema);