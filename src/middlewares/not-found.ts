import { Request, Response, NextFunction } from "express";
import { sendError } from "../libs/response";

export const notFound = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return sendError(
        res,
        "Route not found",
        404,
    );
};
