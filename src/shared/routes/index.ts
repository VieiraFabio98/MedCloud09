import { Router } from "express";
import { authenticateRoutes } from "./authenticate.routes";
import { patientRoutes } from "./patient.routes";

export const router = Router();

router.use("/createpatient", patientRoutes)
router.use("/listpatient", patientRoutes)
router.use("/deletepatient", patientRoutes)
router.use("/updatepatient", patientRoutes)
router.use(authenticateRoutes);
