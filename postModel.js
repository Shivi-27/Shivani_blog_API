const mongoose=require("mongoose");
var Schema = mongoose.Schema;


const  postSchema= new mongoose.Schema({
    name:{
        type: Schema, 
        ref: "users",
  
    },
    Phone:{
        type:number,
    },
    email:{
        type:String,
    },
    Password:{
        type: String, 
        ref: "caegories",
    }
},{timestamps:true});

module.exports=mongoose.model("posts",postSchema, "posts");
