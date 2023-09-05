import { Router } from "express";
import { registerUser } from "../controller/userController";


const router = Router();



router.post('/signup', registerUser);






export default router;