import {Router} from 'express';
import {calculateCart} from "./cart.controller";
import {validate} from "../middlewares/validation";
import {calculateCartSchema} from "./types/input.type";

const router = Router();

router.post('/calculate', validate(calculateCartSchema), calculateCart);

export default router;
