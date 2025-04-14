import { Schema, model } from "mongoose";

const collection = "usuarios";
const schema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://cdn-icons-png.flaticon.com/512/266/266033.png" },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"], index: true },
  },
  { timestamps: true }
);

const Usuario = model(collection, schema);
export default Usuario;