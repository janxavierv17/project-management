import { Request, Response } from "express";
import { Task } from "../db";
import { deleteTaskById, getTasksById } from "../services";

interface IRequest extends Request {
	params: { id: string };
}

export const deleteTaskByIdController = async (req: IRequest, res: Response) => {
	try {
		const id = req.params.id;
		const task = await getTasksById(Number(id));
		if (!task) throw new Error(`A task with an id of ${id} does not exist`);

		await deleteTaskById(task.id);
		return res.status(200).json({ message: `Successfully delete task with an id of ${task.id}` });
	} catch (error: any) {
		console.error("[deleteTaskByIdController]", error);
		return res.status(500).json({ message: "Something went wrong", err: error.message });
	}
};
