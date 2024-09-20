import { Router } from "express";
import {
	getAllProjectController,
	postProjectController,
	getProjectByIdController,
	deleteProjectByIdController,
	updateProjectByIdController,
} from "../../controllers";

const router = Router();

router.get("/", getAllProjectController);
router.get("/project/:id", getProjectByIdController);
router.post("/", postProjectController);
router.delete("/project/:id", deleteProjectByIdController);
router.put("/project/:id", updateProjectByIdController);

export default router;
