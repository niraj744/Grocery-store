import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  clerkID: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
});

const User = mongoose.model("user", UserSchema);
export default User;
