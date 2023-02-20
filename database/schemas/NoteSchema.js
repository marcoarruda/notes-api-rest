import mongoose from "mongoose"

export default new mongoose.Schema({
  note: String,
  createdAt: Date,
  completedAt: Date,
})
