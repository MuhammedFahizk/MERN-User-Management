import { Router } from "express";
const router = Router();

import userRoutes from "./userRoutes.js";

router.use("/user", userRoutes);

export default router;