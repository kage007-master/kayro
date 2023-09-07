import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  version: { type: String, required: true },
  chance: { type: Number, required: true, default: 0 },
  addr: { type: String, required: true },
  time: { type: Date },
});

export default mongoose.model("status", Schema);
