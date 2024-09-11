import { Request, Response } from "express";
import { getAllProjects } from "../services";

export const getAllProjectController = async (req: Request, res: Response) => {
	try {
		const projects = await getAllProjects();
		return res.status(200).json(projects);
	} catch (error: any) {
		console.error(error);
		return res.status(500).json({ message: "Something went wrong", error });
	}
};
