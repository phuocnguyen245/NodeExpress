import mongoose from "mongoose";
const { Schema } = mongoose;
const productSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      unique: false,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      unique: false,
      required: true,
    },
    qty: {
      type: Number,
      unique: false,
      required: true,
    },
    discountId: {
      type: String,
      unique: false,
    }
  },
  {
    timestamps: true,
  }
);

export const Products = mongoose.model(
  "products",
  productSchema
);
