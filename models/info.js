const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const imageinfoSchema=new Schema({
    label:{
        type:String,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    }
});




module.exports=mongoose.model("ImgeInfo",imageinfoSchema);