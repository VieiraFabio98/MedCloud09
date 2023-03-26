import { Router } from "express";
import { patientRoutes } from "./patient.routes";

export const router = Router();

router.use("/createpatient", patientRoutes)
router.use("/listpatient", patientRoutes)
router.use("/deletepatient", patientRoutes)