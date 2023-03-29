
import mongoose from 'mongoose';
const { Schema } = mongoose;
const cartSchema = new Schema({
    product_ID: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        require: true
    },
    user_ID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    qty: {
        type: Number,
        require: true
    },
    isCheck: {
        type: Boolean,
        default: false,
        require: true
    },
}, {
    timestamps: true
});

export const Cart = mongoose.model('carts', cartSchema);