import { Request, Response } from "express";
import { Task } from "../db";
import { postTask } from "../services";

interface IRequest<T> {
	body: T;
}

export const postTaskController = async (req: IRequest<Task>, res: Response) => {
	try {
		const payload = req.body;
		await postTask(payload);
		return res.status(200).json({ message: "Successfully create a task." });
	} catch (error: any) {
		console.error("[postTaskController]", error);
		return res.status(500).json({ message: "Something went wrong", err: error });
	}
};
