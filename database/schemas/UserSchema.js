import mongoose from "mongoose"

export default new mongoose.Schema({
  email: String,
  password: String,
  createdAt: Date,
})
