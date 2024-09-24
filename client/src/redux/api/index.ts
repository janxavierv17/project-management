import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  URGENT = 'Urgent',
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
  BACKLOG = 'Backlog',
}

export enum TaskStatus {
  TO_DO = 'To Do',
  WORK_IN_PROGRESS = 'Work In Progress',
  UNDER_REVIEW = 'Under Review',
  COMPLETED = 'Completed',
}

export interface User {
  userId?: number;
  teamId: number;
  userName?: string;
  email: string;
  profilePictureUrl?: string;
  cognitoId?: string;
}

export interface Attachment {
  id: number;
  fileURL: string;
  fileName: string;
  taskId: number;
  uploadedBy: number;
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: string;
  projectId: string;
  authorUserId?: string;
  assignedUserId?: string;
  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments: Attachment[];
}

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Projects', 'Tasks'],
  endpoints: (build) => ({
    getProjects: build.query<Project[], void>({
      query: () => 'projects',
      providesTags: ['Projects'],
    }),
    createProject: build.mutation<Project, Partial<Project>>({
      query: (payload) => ({
        url: 'projects/project',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Projects'],
    }),
    getTasks: build.query<Task[], { projectId: number }>({
      query: ({ projectId }) => `tasks/task?id=${projectId}`,
      providesTags: (result) =>
        result
          ? result.map(({ id }) => ({ type: 'Tasks' as const, id }))
          : [{ type: 'Tasks' as const }],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (payload) => ({
        url: 'tasks/task',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Tasks'],
    }),
    updateTaskStatus: build.mutation<Task, { taskId: number; status: TaskStatus }>({
      query: ({ taskId, status }) => ({
        url: `tasks/task/${taskId}`,
        method: 'PATCH',
        body: status,
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Tasks', id: taskId }],
    }),
  }),
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
});

export const {
  useGetProjectsQuery,
  useCreateProjectMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
} = api;
