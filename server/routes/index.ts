import { Router } from "express";
import Controllers from "../controllers";
const router = Router();

router.post("/pk", Controllers.Pk.add);
router.post("/pk/show", Controllers.Pk.show);
router.post("/pk/calc", Controllers.Pk.calc);
router.post("/pk/visible", Controllers.Pk.visible);

export default router;
