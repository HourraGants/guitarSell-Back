import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

import guitarActions from "./modules/item/guitar/guitarActions";

router.get("/api/guitar/:id", guitarActions.read);
router.get("/api/guitar", guitarActions.browse);

/* ************************************************************************* */

export default router;
