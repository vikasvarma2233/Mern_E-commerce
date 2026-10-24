import { Router } from 'express';
import { registerValidation , loginValidation } from '../validator/auth.validator.js';
import register, { login , refresh , getMe} from "../controller/auth.controller.js";
import { authenticate } from '../middlewares/auth.middleware.js';


const router = Router();

router.post('/register', registerValidation, register);

router.post('/login',loginValidation,login)

router.post('/refresh',refresh)

router.get("/me", authenticate, getMe)

export default router;