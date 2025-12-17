import BigNumber from "bignumber.js";
import { CartCalculationResult } from "./types/response.type";
import { CalculateCartInput } from "./types/input.type";
import { DiscountStrategy } from "./contracts/discount-rule.contract";

export class CartService {
    constructor(
        private readonly discountRules: DiscountStrategy[],
        private readonly vatPercentage: number
    ) {}

    calculateCart(data: CalculateCartInput): CartCalculationResult {
        const subtotal = this.calculateSubtotal(data.items);

        let discountsApplied = new BigNumber(0);

        for (const rule of this.discountRules) {
            const discount = rule.apply({
                items: data.items,
                subtotal,
                currentDiscounts: discountsApplied,
            });

            discountsApplied = discountsApplied.plus(discount);
        }

        const totalAfterDiscounts = subtotal.minus(discountsApplied);
        const vatAmount = this.calculateVat(totalAfterDiscounts);
        const totalPayable = totalAfterDiscounts.plus(vatAmount);

        return {
            subtotal: this.format(subtotal),
            discountsApplied: this.format(discountsApplied),
            totalAfterDiscounts: this.format(totalAfterDiscounts),
            vatAmount: this.format(vatAmount),
            totalPayable: this.format(totalPayable),
        };
    }

    private calculateSubtotal(items: CalculateCartInput["items"]): BigNumber {

        // I sent the task to HR team, but two days after than, I'm thinking about what if there are millions of items?
        // Well.. it actually doesn't happen in a real-world scenario, (cart with millions item seems insane) but for the sake of the exercise,
        // first, we can replace classic (for ... let i = 0..) loop, because reduce is cpu-intensive and uses more memory.
        // And for a final solution guess we can:
        // 1. paginate for loop
        // 2. use streams
        // 3. or for avoding blocking event loop, use worker threads

        return items.reduce((sum, item) => {
            const itemTotal = new BigNumber(item.price)
                .multipliedBy(item.quantity);

            return sum.plus(itemTotal);
        }, new BigNumber(0));
    }

    private calculateVat(amount: BigNumber): BigNumber {
        return amount.multipliedBy(this.vatPercentage);
    }

    private format(value: BigNumber): string {
        return value.decimalPlaces(2, BigNumber.ROUND_HALF_UP).toFixed(2);
    }
}
