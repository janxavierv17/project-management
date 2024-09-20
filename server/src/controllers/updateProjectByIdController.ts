import { Request, Response } from "express";
import { Project } from "../db";
import { getProjectById, updateProjectById } from "../services";

interface IRequest<T> extends Request {
	body: T;
}

export const updateProjectByIdController = async (req: IRequest<Project>, res: Response) => {
	const payload = req.body;
	try {
		if (!payload.id) throw new Error("Please include an id to update a project");
		const project = await getProjectById(Number(payload.id));

		if (!project) throw new Error(`Project with an id of ${payload.id} does not exist.`);
		await updateProjectById(project.id, payload);

		return res.status(200).json({ message: `Successfully updated your project with an id of ${project.id}.` });
	} catch (err: any) {
		console.error("[updateProjectByIdController]", err);
		return res.status(500).send({ message: "Something went wrong", err });
	}
};
