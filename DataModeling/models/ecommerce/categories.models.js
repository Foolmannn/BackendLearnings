import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true
    },
    
},{timestamps:true})

export const Category = mongoose.model("Category", categorySchema) // here no matter you write the category or catergories the mongodb save it as the plural name ie categories in db