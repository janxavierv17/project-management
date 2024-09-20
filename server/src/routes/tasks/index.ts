import { Router } from "express";
import {
	deleteTaskByIdController,
	getTaskByIdController,
	getTasksController,
	postTaskController,
	updateTasksByIdController,
} from "../../controllers";

const app = Router();

app.get("/", getTasksController);
app.get("/task", getTaskByIdController);
app.post("/task", postTaskController);
app.delete("/task/:id", deleteTaskByIdController);
app.put("/task", updateTasksByIdController);

export default app;
