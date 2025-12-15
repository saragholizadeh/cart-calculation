import BigNumber from "bignumber.js";
import { DiscountContext, DiscountStrategy } from "../contracts/discount-rule.contract";

export class CartTotalDiscountRule implements DiscountStrategy {
    constructor(
        public readonly name: string,
        private readonly minTotal: number,
        private readonly discountAmount: number,
    ) {}

    apply(context: DiscountContext): BigNumber {
        const totalAfterDiscounts =
            context.subtotal.minus(context.currentDiscounts);

        return totalAfterDiscounts.isGreaterThan(this.minTotal)
            ? new BigNumber(this.discountAmount)
            : new BigNumber(0);
    }
}
