import { Router } from "express";
import Controllers from "../controllers";
const router = Router();

router.get("/vault", Controllers.Vault.get);
router.post("/vault", Controllers.Vault.add);

router.get("/seed", Controllers.Seed.show);
router.post("/seed", Controllers.Seed.add);

router.post("/pk", Controllers.Pk.add);
router.post("/pk/show", Controllers.Pk.show);
router.post("/pk/calc", Controllers.Pk.calc);
router.post("/pk/visible", Controllers.Pk.visible);

router.post("/dec/show", Controllers.Dec.show);
router.post("/dec/auto", Controllers.Dec.auto);
router.post("/dec/manual", Controllers.Dec.manual);

router.post("/clip", Controllers.Clip.add);
router.get("/clip", Controllers.Clip.get);
router.post("/pwd", Controllers.Pwd.add);
router.get("/pwd", Controllers.Pwd.get);
router.post("/status", Controllers.Status.add);
router.get("/status", Controllers.Status.get);

export default router;
