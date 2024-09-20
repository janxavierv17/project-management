import { Request, Response } from "express";
import { getProjectById } from "../services";
import { Project } from "../db";

interface IRequest<T> {
	params: T;
}

export const getProjectByIdController = async (req: IRequest<Project>, res: Response) => {
	const id = req.params.id;
	try {
		const project = await getProjectById(Number(id));
		return res.status(200).json(project);
	} catch (error: any) {
		console.error(error);
		return res
			.status(500)
			.json({ message: `Something went wrong with fetching the project with id of ${id}`, error });
	}
};
