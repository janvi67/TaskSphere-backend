import Task from "../modals/task.modal.js";
import TaskHistory from "../modals/task.History.modal.js";

export const taskReport = async (req, res) => {
  // All tasks
  const tasks = await Task.find()
    .populate("assignedTo", "name role")
    .populate("assignedBy", "name role");

  // Get completed dates from history
  const completedHistory = await TaskHistory.find({
    action: "STATUS_UPDATE",
    status: "COMPLETED"
  });

  // Map taskId -> completedAt
  const completedMap = {};
  completedHistory.forEach((h) => {
    completedMap[h.task.toString()] = h.createdAt;
  });

  const report = tasks.map((task) => ({
    taskId: task._id,
    taskName: task.title,
    status: task.status,
    assignedTo: task.assignedTo?.name,
    assignedBy: task.assignedBy?.name,
    completedAt:
      
        completedMap[task._id.toString()] || null
        
  }));

  res.json(report);
};
