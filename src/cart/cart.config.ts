import { DiscountStrategy } from "./contracts/discount-rule.contract";
import { CategoryDiscountRule } from "./rules/category-discount.rule";
import { CartTotalDiscountRule } from "./rules/cart-total-discount.rule";

export const discountRules: DiscountStrategy[] = [
    new CategoryDiscountRule("Electronics 10%", "electronics", 0.1),
    new CartTotalDiscountRule("Bulk discount", 50, 10),
];
