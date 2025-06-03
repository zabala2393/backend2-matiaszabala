import { Schema, Types, model } from "mongoose";

const collection = "users"
const schema = new Schema(
  {
    first_name: { type: String, required: true },
    age: { type: Number, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true }, 
    cart: { type: Types.ObjectId, ref: "carts", index: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"], required: true, index: true },
    isVerified: {type: Boolean, default: false},
    verifyCode: {type:String},
  },
  { timestamps: true }
);

const Usuario = model(collection, schema);
export default Usuario;