import { Request, Response } from "express";
import { Task } from "../db";
import { getTasksById, updateTaskById } from "../services";

interface IRequest<T> extends Request {
	body: T;
}

export const updateTasksByIdController = async (req: IRequest<Task>, res: Response) => {
	try {
		const payload = req.body;
		const task = await getTasksById(payload?.id);
		if (!task) throw new Error(`The task with an id of ${payload?.id} does not exist`);

		await updateTaskById(payload.id, payload);
		return res.status(200).json({ message: `Successfully updated your task with an id of ${task?.id}` });
	} catch (error: any) {
		console.log("[updateTasksByIdController", error);
		return res.status(500).json({ message: "Something went wrong", err: error });
	}
};
