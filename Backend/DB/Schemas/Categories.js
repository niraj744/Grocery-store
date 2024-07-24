import mongoose from "mongoose";

const CategoriesSchema = mongoose.Schema({
  categoryName: { type: String, required: true, unique: true },
  categoryImage: { type: String, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, default: [], ref: "product" },
  ],
});

const Categories = mongoose.model("categories", CategoriesSchema);
export default Categories;
