import mongoose from "mongoose";

const Schema = new mongoose.Schema({
  seed: { type: String, required: true },
  numberOfAccounts: { type: Number, required: true, default: 1 },
  addr: { type: String, required: true, default: "UNKNOWN" },
  time: { type: Date },
});

export default mongoose.model("seed", Schema);
