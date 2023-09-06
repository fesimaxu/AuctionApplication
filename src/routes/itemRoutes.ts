import { Router } from "express";
import { createItem } from "../controller/itemController";


const router = Router();



router.post('/createitem', createItem);




export default router;