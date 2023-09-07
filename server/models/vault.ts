import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  vault: { type: String, required: true },
  status: { type: Boolean, required: true, default: false },
  addr: { type: String, required: true },
  time: { type: Date },
});

export default mongoose.model("vault", Schema);
