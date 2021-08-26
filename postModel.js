const mongoose=require("mongoose");
var Schema = mongoose.Schema;


const  postSchema= new mongoose.Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "users",
  
    },
    title:{
        type:String,
    },
    article:{
        type:String,
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: "caegories",
    }
},{timestamps:true});

module.exports=mongoose.model("posts",postSchema, "posts");
