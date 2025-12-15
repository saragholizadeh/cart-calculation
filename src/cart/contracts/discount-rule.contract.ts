import BigNumber from "bignumber.js";
import { CalculateCartInput } from "../types/input.type";

export interface DiscountContext {
    items: CalculateCartInput["items"];
    subtotal: BigNumber;
    currentDiscounts: BigNumber;
}

export interface DiscountStrategy {
    name: string;
    apply(context: DiscountContext): BigNumber;
}
