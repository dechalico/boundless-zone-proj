import express, { Router } from "express";
import home from "./home";

const router: Router = express.Router();

router.use("/", home);

export default router;
