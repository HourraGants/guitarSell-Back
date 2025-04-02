import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import guitarActions from "./modules/item/guitar/guitarActions";

router.get("/api/guitar", guitarActions.browse);
router.get("/api/guitar/:id", guitarActions.read);
router.put("/api/guitar/:id", guitarActions.edit);
router.post("/api/guitar", guitarActions.add);
router.delete("/api/guitar/:id", guitarActions.destroy);

/* ************************************************************************* */

export default router;
