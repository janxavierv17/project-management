import { Request, Response } from "express";
import { db, Project } from "../db";

export const getAllProjects = async (): Promise<Project[]> => {
	try {
		const projects = db.project.findMany();
		return projects;
	} catch (error: any) {
		return error;
	}
};
