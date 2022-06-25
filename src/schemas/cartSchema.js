import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  products: { type: Array, require: true },
  timestamp: { type: Date, require: true },
});
export default cartSchema;
