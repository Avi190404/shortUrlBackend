import { Router } from "express";
import shortlinkRoutes from "./shortlinkRoutes";
import authRoutes from "./authRoutes";

const router = Router();
router.use(shortlinkRoutes);
router.use(authRoutes);

export default router;