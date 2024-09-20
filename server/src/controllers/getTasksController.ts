import { Request, Response } from "express";
import { getAllTasks } from "../services";

export const getTasksController = async (req: Request, res: Response) => {
	try {
		const tasks = await getAllTasks();
		return res.status(200).json(tasks);
	} catch (err: any) {
		console.error("[getTasksController]", err);
		return res.status(500).json({ message: "Something went wrong", err: err.message });
	}
};
