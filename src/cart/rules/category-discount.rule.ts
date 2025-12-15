import BigNumber from "bignumber.js";
import { DiscountContext, DiscountStrategy } from "../contracts/discount-rule.contract";

export class CategoryDiscountRule implements DiscountStrategy {
    constructor(
        public readonly name: string,
        private readonly category: string,
        private readonly percentage: number,
    ) {}

    apply(context: DiscountContext): BigNumber {
        return context.items
            .filter(item => item.category === this.category)
            .reduce((sum, item) => {
                const itemTotal = new BigNumber(item.price)
                    .multipliedBy(item.quantity)
                    .multipliedBy(this.percentage);

                return sum.plus(itemTotal);
            }, new BigNumber(0));
    }
}
