import { Request, Response } from "express";
import { Project } from "../db";
import { deleteProjectById, getProjectById } from "../services";

interface IRequest<T> {
	params: T;
}

export const deleteProjectByIdController = async (req: IRequest<Project>, res: Response) => {
	const id = req.params.id;
	try {
		const project = await getProjectById(Number(id));
		if (!project) throw new Error(`Project with an id of ${id} does not exist.`);

		await deleteProjectById(project.id);
		res.status(200).json({ message: `Succesfully deleted project` });
	} catch (err: any) {
		console.error("[deleteProjectByIdController]", err);
		res.status(500).json({ message: "Something went wrong", err: err?.message });
	}
};
