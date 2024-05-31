import {asyncHandler} from "../utils/asyncHandler.js"; 
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js"
import { uploadFile } from "../utils/fileUpload.js"; 
import { apiResponse } from "../utils/apiResponse.js";

const registerUser = asyncHandler( async (req, res) => { 
    const {fullname, email, username, password} = req.body
    console.log("email ", email)

   if( 
    [fullname, email, username, password].some((field) => field?.trim() === "")
   ){
    throw new ApiError(400, "ALL FIELDS ARE REQUIRED")
   }

   const existedUser = await User.findOne({
    $or: [{email}, {username}]
   })
   if (existedUser){
    throw new ApiError(409, "SAME EMAIL OR USERNAME ALREADY EXISTS");
   }

   let coverImageLocalPath;
   if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
    coverImageLocalPath = req.files.coverImage[0].path
   }

   if (!avatarLocalPath){
    throw new ApiError(400, "AVATAR FILE IS REQUIRED!!")
   }

   const avatar = await uploadFile(avatarLocalPath)
   const coverImage = await uploadFile(coverImageLocalPath)

   if (!avatar){
    throw new ApiError(400, "AVATAR FILE IS REQUIRED")
   }

   const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", 
    email,
    password,
    username: username.toLowerCase(),
   })
   const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
   )
   if (createdUser) {
    throw new ApiError(400, "SOME WENT WRONG WHILE REGISTERING :(");
   }

   return res.status(201).json(
    new apiResponse(200, createdUser, "USER REGISTERED SUCCESSFULLY")
   )
})

export {registerUser}