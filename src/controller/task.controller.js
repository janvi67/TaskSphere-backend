import Task from "../modals/task.modal.js";
import TaskHistory from "../modals/task.History.modal.js";

export const createTask=async(req,res)=>{
const task=await Task.create({
    ...req.body,
       assignedBy: req.user._id

})

await TaskHistory.create({
    task:task._id,
    action:"Task Created",
    updatedBy:req.user._id,
    details:`Task "${task.title}" created by ${req.user.name}`
});

res.status(201).json({message:"Task created successfully",task});


}

export const getTasks=async(req,res)=>{
    let filter={};

    if(req.user.role==="EMPLOYEE"){
        filter={assignedTo:req.user._id};
    }
const tasks=await Task.find(filter).populate("assignedTo","name role").populate("assignedBy","name role");
res.json({tasks});
}

export const updateTaskStatus=async(req,res)=>{
    const {status,comment}=req.body;
    const task=await Task.findByIdAndUpdate(req.params.id,{status},{new:true});

    await TaskHistory.create({
        task:task._id,
        action:"status Updated",
        comment,
        updatedBy:req.user._id,
        details:`Task "${task.title}" updated to status "${status}" by ${req.user.name}. Comments: ${comment || "N/A"}`
    });
    res.json({message:"Task updated successfully",task});
}

export const getTaskHistory=async(req,res)=>{
    const histories=await TaskHistory.find({task:req.params.id}).populate("updatedBy","name role").populate("task", "title status").sort({createdAt:-1});
    res.json({histories});
}