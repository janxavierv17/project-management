import { Request, Response } from "express";
import { getTasksById } from "../services";

interface IRequest extends Request {
	query: { id: string };
}

export const getTaskByIdController = async (req: IRequest, res: Response) => {
	try {
		const { id } = req.query;
		const task = await getTasksById(Number(id));
		if (!task) throw new Error(`A task with an id of ${id} does not exist`);

		return res.status(200).json(task);
	} catch (error: any) {
		console.error("[getTaskByIdController]", error);
		res.status(500).json({ message: "Something went wrong", err: error });
	}
};
