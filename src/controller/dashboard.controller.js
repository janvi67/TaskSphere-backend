import User from "../modals/user.modal.js";
import Task from "../modals/task.modal.js";

export const getDashboardStats = async (req, res) => {
    console.log("🚀 ~ getDashboardStats ~ req.user:", req.user)
  const role = req.user.role;
  const userId = req.user._id;

  let stats = {};

  // 🔴 ADMIN / SUPER ADMIN
  if (role === "ADMIN" || role === "SUPER_ADMIN") {
    stats = {
      totalUsers: await User.countDocuments(),
      totalTasks: await Task.countDocuments(),
      completedTasks: await Task.countDocuments({ status: "COMPLETED" }),
      pendingTasks: await Task.countDocuments({ status: "PENDING" })
    };
  }

  // 🔵 TEAM LEADER
  if (role === "TEAM_LEADER") {
    stats = {
      teamTasks: await Task.countDocuments({ assignedBy: userId }),
      completedTasks: await Task.countDocuments({
        assignedBy: userId,
        status: "COMPLETED"
      }),
      pendingTasks: await Task.countDocuments({
        assignedBy: userId,
        status: "PENDING"
      })
    };
  }

  // 🟢 STAFF / EMPLOYEE
  if (role === "STAFF" || role === "EMPLOYEE") {
    stats = {
      myTasks: await Task.countDocuments({ assignedTo: userId }),
      completedTasks: await Task.countDocuments({
        assignedTo: userId,
        status: "COMPLETED"
      }),
      pendingTasks: await Task.countDocuments({
        assignedTo: userId,
        status: "PENDING"
      })
    };
  }

  res.json(stats);
};
