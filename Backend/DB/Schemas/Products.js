import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  productName: { type: String, required: true, unique: true },
  productImage: { type: String, required: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "categories",
    required: true,
  },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  weight: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
});

const Product = mongoose.model("product", ProductSchema);
export default Product;
