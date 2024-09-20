import { Request, Response } from "express";
import { getProjectById } from "../services";
import { Project } from "../db";

interface IRequest extends Request {
	query: { id: string };
}

export const getProjectByIdController = async (req: IRequest, res: Response) => {
	const { id } = req.query;
	try {
		const project = await getProjectById(Number(id));
		return res.status(200).json(project);
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: `Something went wrong with fetching the project with id of ${id}`, error: error });
	}
};
