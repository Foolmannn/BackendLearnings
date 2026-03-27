import mongoose from "mongoose";


// this below is the mini schema for the order items
const orderItemSchema = new mongoose.Schema({
    productId:{type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },
    quantity:{
        type:Number,
        required:true
    }
})

const orderSchema = new mongoose.Schema({
    orderPrice:{
        type:Number,
        required:true
    },
    customer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    orderItems: {
        type:[orderItemSchema] //here the array of the order items
    },
    address:{
        type: String,
        required: true
    },
    status:{
        type:String,
        enum:["PENDING" , "CANCELLED" ,"DELIVERED"], // this is how you limit to the options
        default: "PENDING"
    }
},{timestamps:true})

export const Order = mongoose.model("Order" , orderSchema)