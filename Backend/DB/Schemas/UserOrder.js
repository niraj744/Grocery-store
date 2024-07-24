import mongoose from "mongoose";

const UserOrderSchema = mongoose.Schema({
  quantity: { type: Number, required: true, default: 1 },
  userID: { type: mongoose.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  product: { type: mongoose.Types.ObjectId, ref: "product", required: true },
});

const UserOrder = mongoose.model("userOrder", UserOrderSchema);
export default UserOrder;
