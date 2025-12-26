import express from "express";
import cors from "cors"
import authRoutes from "./routes/auth.routes.js";
import testRoutes from "./routes/test.routes.js";
import taskRoutes from "./routes/task.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userRoutes from "./routes/user.routes.js";
import reportsRoutes from "./routes/reports.routes.js";

const app=express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/test",testRoutes);
app.use("/api/tasks",taskRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports",reportsRoutes);



export default app;
