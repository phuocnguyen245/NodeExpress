import mongoose from 'mongoose';
const { Schema } = mongoose;
const orderSchema = new Schema({
    productsId: {
        type: Array,
        max: 255,
        require: true
    },
    isPay: {
        type: Boolean,
        required: true,
        default: false
    },
    user_ID: {
        type: Schema.Types.ObjectId,
        require: true
    },
    status: {
        type: Number,
        required: true,
        default: 1
    },
}, {
    timestamps: true
});

export const Orders = mongoose.model('orders', orderSchema);