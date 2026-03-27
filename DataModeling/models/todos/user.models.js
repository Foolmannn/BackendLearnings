//user.models.js is the standard naming practice only 

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // username : String,
    // email: String,
    // isActive : Boolean
    //above is the general way of the defining schema but mongodb has the special features as the object . We can add the constraints and detial using the object
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
  },
  { timestamps: true },
);

export const User = mongoose.model("User", userSchema);

// no matter what you give the name for ex User here will be converted to the users in db