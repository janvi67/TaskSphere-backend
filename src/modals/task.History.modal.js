import mongoose from "mongoose";
import { act } from "react";

const taskHistorySchema=new mongoose.Schema({
    task:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Task",
        required:true
    },
    action:String,
    comment:String,
    updatedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},
    {timestamps:true}

);
export default mongoose.model("TaskHistory",taskHistorySchema);   