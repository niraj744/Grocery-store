import mongoose from "mongoose";

const CheckoutSchema = mongoose.Schema({
  userID: { type: String, required: true },
  stripeID: { type: String, required: true },
  products: [
    { type: mongoose.Schema.Types.ObjectId, default: [], ref: "product" },
  ],
});

const Checkout = mongoose.model("Checkout", CheckoutSchema);
export default Checkout;
