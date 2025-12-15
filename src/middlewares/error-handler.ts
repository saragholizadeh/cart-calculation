import { Request, Response, NextFunction } from "express";
import { sendError } from "../libs/response";

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err);

    return sendError(
        res,
        err.message || "Internal Server Error",
        err.status || 500,
    );
};
