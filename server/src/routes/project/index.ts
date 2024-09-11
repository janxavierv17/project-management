import { Router } from "express";
import { getAllProjectController } from "../../controllers";

const router = Router();

router.get("/", getAllProjectController);

export default router;
