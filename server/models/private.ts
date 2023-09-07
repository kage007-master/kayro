import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  pk: { type: String, required: true },
  addr: { type: String, required: true, default: "UNKNOWN" },
  zero: { type: Boolean, default: false },
  time: { type: Date },

  Pub: { type: String },
  TOTAL: { type: String },
});

export default mongoose.model("private", Schema);
