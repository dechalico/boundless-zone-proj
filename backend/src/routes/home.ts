import express, { Router } from "express";
import homeController from "../controllers/homeController";

const router: Router = express.Router();

router.post("/register", homeController.register);

router.post("/login", homeController.login);

router.get("/account", homeController.account);

export default router;
