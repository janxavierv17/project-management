import { Request, Response } from "express";
import { updateTaskStatusById } from "../services";

enum TaskStatus {
	TO_DO = "To Do",
	WORK_IN_PROGRESS = "Work In Progress",
	UNDER_REVIEW = "Under Review",
	COMPLETED = "Completed",
}
interface IRequest extends Request {
	params: {
		id: string;
	};
	body: {
		status: TaskStatus;
	};
}

export const updateTaskStatusByIdController = async (req: IRequest, res: Response) => {
	const id = req.params.id;
	const status = req.body.status;

	try {
		if (
			status !== "To Do" &&
			status !== "Work In Progress" &&
			status !== "Under Review" &&
			status !== "Completed"
		) {
			throw new Error(`Status can only either be in To Do, Work In Progress or Done`);
		}

		await updateTaskStatusById(Number(id), status);
		return res.status(200).json({ message: `Successfully updated the status of task id ${id} to ${status}` });
	} catch (error: any) {
		console.error("[updateTaskStatusByIdController]", error);
		return res.status(500).json({ message: "Something went wrong", err: error.message });
	}
};
