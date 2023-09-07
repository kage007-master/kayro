import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  pk: { type: String, required: true },
  zero: { type: Boolean, default: false },

  Pub: { type: String },
  TOTAL: { type: String },
});

export default mongoose.model("private", Schema);
