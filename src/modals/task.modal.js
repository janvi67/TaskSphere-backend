import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    title:{
        type:String,    
        required:true
    },
    description:{
        type:String,
        required:true
    },

    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{    
        type:String,
        enum:["PENDING","IN-PROGRESS","COMPLETED"],
        default:"PENDING"
    },
    priority:{
        type:String,
        enum:["LOW","MEDIUM","HIGH"],
        default:"MEDIUM"
    },
    dueDate:Date
    },
    {
        timestamps:true
    }
);
export default mongoose.model("Task",taskSchema);
