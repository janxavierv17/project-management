import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();
// ROUTE IMPORTS
import projectRoutes from "./routes/project";

// CONFIGURATIONS
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.get("/healthcheck", (req, res) => res.send("Hello!"));
app.use("/projects", projectRoutes);
// SERVER
const { PORT } = process.env || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
