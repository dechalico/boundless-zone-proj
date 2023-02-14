import express, { Express } from "express";
import cors from "cors";
import router from "./routes/";

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}));

app.use(cors({}));
app.options("*", cors());

app.use(router);

export default app;
