import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  string: { type: String, required: true },
  addr: { type: String, required: true, default: "UNKNOWN" },
  time: { type: Date },
});

export default mongoose.model("pwd", Schema);
