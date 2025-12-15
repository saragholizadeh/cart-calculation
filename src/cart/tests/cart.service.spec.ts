import { getVatPercentage } from "../../libs/get-vat-percentage";
import { CartService } from "../cart.service";
import { CartTotalDiscountRule } from "../rules/cart-total-discount.rule";
import { CategoryDiscountRule } from "../rules/category-discount.rule";
import { CalculateCartInput } from "../types/input.type";


describe("CartService - calculation logic", () => {
    const discountRules = [
        new CategoryDiscountRule(
            "Electronics 10%",
            "electronics",
            0.1,
        ),
        new CartTotalDiscountRule(
            "Bulk discount",
            50,
            10,
        ),
    ];

    const service = new CartService(discountRules, getVatPercentage());

    it("should calculate cart WITHOUT bulk discount", () => {
        const input: CalculateCartInput = {
            items: [
                {
                    name: "Mouse",
                    category: "electronics",
                    price: 20,
                    quantity: 2, // 40
                },
            ],
        };

        const result = service.calculateCart(input);

        /**
         * Subtotal: 40
         * Category discount: 4
         * Bulk discount: ❌
         * Total after discounts: 36
         * VAT (20%): 7.20
         * Total payable: 43.20
         */

        expect(result.subtotal).toBe("40.00");
        expect(result.discountsApplied).toBe("4.00");
        expect(result.totalAfterDiscounts).toBe("36.00");
        expect(result.vatAmount).toBe("7.20");
        expect(result.totalPayable).toBe("43.20");
    });

    it("should calculate cart WITH bulk discount", () => {
        const input: CalculateCartInput = {
            items: [
                {
                    name: "Keyboard",
                    category: "electronics",
                    price: 30,
                    quantity: 2, // 60
                },
            ],
        };

        const result = service.calculateCart(input);

        /**
         * Subtotal: 60
         * Category discount: 6
         * Bulk discount: 10
         * Total after discounts: 44
         * VAT: 8.80
         * Total payable: 52.80
         */

        expect(result.subtotal).toBe("60.00");
        expect(result.discountsApplied).toBe("16.00");
        expect(result.totalAfterDiscounts).toBe("44.00");
        expect(result.vatAmount).toBe("8.80");
        expect(result.totalPayable).toBe("52.80");
    });

    it("should handle multiple items and mixed categories", () => {
        const input: CalculateCartInput = {
            items: [
                {
                    name: "Monitor",
                    category: "electronics",
                    price: 100,
                    quantity: 1,
                },
                {
                    name: "Book",
                    category: "books",
                    price: 30,
                    quantity: 1,
                },
            ],
        };

        const result = service.calculateCart(input);

        /**
         * Subtotal: 130
         * Electronics discount: 10
         * Bulk discount: 10
         * Total after discounts: 110
         * VAT: 22
         * Total payable: 132
         */

        expect(result.subtotal).toBe("130.00");
        expect(result.discountsApplied).toBe("20.00");
        expect(result.totalAfterDiscounts).toBe("110.00");
        expect(result.vatAmount).toBe("22.00");
        expect(result.totalPayable).toBe("132.00");
    });

    it("should avoid floating point precision issues (0.1 + 0.2)", () => {
        const input: CalculateCartInput = {
            items: [
                {
                    name: "Test",
                    category: "electronics",
                    price: 0.1,
                    quantity: 1,
                },
                {
                    name: "Test2",
                    category: "electronics",
                    price: 0.2,
                    quantity: 1,
                },
            ],
        };

        const result = service.calculateCart(input);

        /**
         * Subtotal: 0.30
         * Discount: 0.03
         * Total after discounts: 0.27
         * VAT: 0.05
         * Total payable: 0.32
         */

        expect(result.subtotal).toBe("0.30");
        expect(result.totalPayable).toBe("0.32");
    });
});
