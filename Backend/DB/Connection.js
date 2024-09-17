import { connect } from "mongoose";

const Connection = async (url) => {
  try {
    await connect(url, { dbName: "groceryStore" });
    console.log("connected");
  } catch (error) {
    console.log("ERROR IN CONNECTION.JS", error);
  }
};
export default Connection;
