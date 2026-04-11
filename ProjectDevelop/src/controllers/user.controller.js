import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js"

const registerUser = asyncHandler( async (req,res) =>{
 //get user Details from the frontend
 //validation - not empty
 //check if user already exists: usrename,email
 //check for images , check for avatar
 //upload them to cloudinary , avatar
 //create user object - create entry in db
 //remove password and refreshtoken field from response
 //check for user creation 
 //return res

 const {fullName, email, username, password}= req.body
 console.log("email:", email);
//  if(fullName===""){
//     throw new ApiError(400,"Fullname is required")
//  }
if([fullName,email,username,password].some((field) => field?.trim() === "")
){
 throw new ApiError(400,"All fields are required")
}
 
})

export {registerUser}