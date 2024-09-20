import { Request, Response } from "express";
import { Project } from "../db";
import { postProject } from "../services";

interface IRequestBody<T> extends Request {
	body: T;
}

export const postProjectController = async (req: IRequestBody<Project>, res: Response) => {
	try {
		const payload = req.body satisfies Project;
		await postProject(payload);
		return res.status(201).json({ message: "Successfully created your project." });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ message: "Something went wrong with creating your project", error });
	}
};
