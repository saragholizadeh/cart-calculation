import {z} from "zod";

export const calculateCartSchema = z.object({
    items: z
        .array(
            z.object({
                name: z.string()
                    .trim()
                    .min(1, "Product name is required.")
                    .max(250, "Product name cannot exceed 250 characters."),
                price: z
                    .number()
                    .min(1, "Price must be at least 1.")
                    .max(999_999_999, "Price is too large."),
                category: z
                    .string()
                    .trim()
                    .min(1, "Category is required.")
                    .max(250, "Category cannot exceed 250 characters."),
                quantity: z
                    .number()
                    .int("Quantity must be an integer.")
                    .min(1, "Quantity must be at least 1.")
                    .max(1000, "Quantity cannot exceed 1000."),
            })
        )
        .min(1, "At least one item must be provided."),
});

export type CalculateCartInput = z.infer<typeof calculateCartSchema>;
