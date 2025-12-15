import type { Request, Response } from "express";
import { CartService } from "./cart.service";
import { CalculateCartInput } from "./types/input.type";
import { sendSuccess } from "../libs/response";
import { discountRules } from "./cart.config";
import { getVatPercentage } from "../libs/get-vat-percentage";

const cartService = new CartService(discountRules, getVatPercentage());

export const calculateCart = (
    req: Request<{}, {}, CalculateCartInput>,
    res: Response
) => {
    const result = cartService.calculateCart(req.body);
    return sendSuccess(res, result);
};
