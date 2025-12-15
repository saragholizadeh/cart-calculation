import { z } from "zod";
import { Request, Response, NextFunction } from "express";
import { sendError } from "../libs/response";

export const validate = (schema: z.ZodTypeAny) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            req.body = schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors = JSON.parse(err.message).map((e: { path: any[]; message: any; }) => ({
                    field: e.path.join('.'),
                    message: e.message
                }));
                return sendError(
                res,
                "Validation failed",
                400,
                errors,
            );
            }
            next(err);
        }
    };
};
