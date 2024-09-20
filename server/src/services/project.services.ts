import { Request, Response } from "express";
import { db, Project } from "../db";

export const getAllProjects = async (): Promise<Project[]> => {
	return db.project.findMany();
};

export const postProject = async (payload: Project): Promise<void> => {
	const { name, description, startDate, endDate } = payload;

	await db.project.create({
		data: {
			name,
			description,
			startDate,
			endDate,
		},
	});
};

export const getProjectById = async (id: number) => {
	return db.project.findFirst({ where: { id } });
};

export const deleteProjectById = async (id: number) => {
	return db.project.delete({
		where: {
			id,
		},
	});
};

export const updateProjectById = async (id: number, payload: Project) => {
	const { name, description } = payload;
	return db.project.update({
		where: {
			id,
		},
		data: {
			name,
			description,
		},
	});
};
