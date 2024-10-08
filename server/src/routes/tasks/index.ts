import { Router } from "express";
import {
	deleteTaskByIdController,
	getTaskByIdController,
	getTaskByProjectIdController,
	getTasksController,
	postTaskController,
	updateTasksByIdController,
	updateTaskStatusByIdController,
} from "../../controllers";

const app = Router();

app.get("/", getTasksController);
app.get("/task/:id", getTaskByIdController);
app.get("/task", getTaskByProjectIdController);
app.post("/task", postTaskController);
app.delete("/task/:id", deleteTaskByIdController);
app.put("/task", updateTasksByIdController);
app.patch("/task/:id", updateTaskStatusByIdController);

export default app;
