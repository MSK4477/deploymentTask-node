import { Schema, model } from "mongoose";

const userSchema = new Schema({
  id: {
    type: "string",
  },
  name: {
    type: "string",
  },
  age: {
    type: "string",
  },
  image: {
     type: "string" 
    },
});
const User = model ('User', userSchema)

export default User
