import mongoose, { models, mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,

    },
    complete:{
        type: Boolean,
        default: false
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId, // this line tell mongoose that the type is the reference from another schema
        ref:"User" // this is the name of the db made in the schema . Here the in the user.models.js

    },
    subTodos: [ {
        type: mongoose.Schema.Types.ObjectId ,
        ref:"SubTodo"
    }
], // array of the subtodos
} , {timestamps:true})


export const Todo = mongoose.model("Todo", todoSchema) //this export the Todo as the db based on the todoSchema defined above 