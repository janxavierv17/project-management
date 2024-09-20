import { PrismaClient, Project, Task } from "@prisma/client";

export const db = new PrismaClient();
export { Project, Task };
