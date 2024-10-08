import { db, Task } from "../db";

export const getAllTasks = async () => {
	return db.task.findMany();
};

export const getTaskByProjectId = async (projectId: number) => {
	return db.task.findMany({
		where: { projectId },
		include: {
			author: true,
			assignee: true,
			comments: true,
			attachments: true,
		},
	});
};

export const getTasksById = async (id: number) => {
	return db.task.findUnique({ where: { id } });
};

export const postTask = async (payload: Task) => {
	const {
		id,
		title,
		description,
		status,
		priority,
		tags,
		startDate,
		dueDate,
		points,
		projectId,
		authorUserId,
		assignedUserId,
	} = payload;

	return db.task.create({
		data: {
			id,
			title,
			description,
			status,
			priority,
			tags,
			startDate,
			dueDate,
			points,
			projectId,
			authorUserId,
			assignedUserId,
		},
	});
};

export const deleteTaskById = async (id: number) => {
	return db.task.delete({ where: { id } });
};

export const updateTaskById = async (id: number, payload: Task) => {
	const {
		title,
		description,
		status,
		priority,
		tags,
		startDate,
		dueDate,
		points,
		projectId,
		authorUserId,
		assignedUserId,
	} = payload;

	return db.task.update({
		where: { id },
		data: {
			title,
			description,
			status,
			priority,
			tags,
			startDate,
			dueDate,
			points,
			projectId,
			authorUserId,
			assignedUserId,
		},
	});
};

enum TaskStatus {
	TO_DO = "To Do",
	WORK_IN_PROGRESS = "Work In Progress",
	UNDER_REVIEW = "Under Review",
	COMPLETED = "Completed",
}
export const updateTaskStatusById = async (id: number, status: TaskStatus) => {
	return db.task.update({
		where: { id },
		data: {
			status,
		},
	});
};
