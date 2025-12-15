import { Response } from "express";
import { ApiErrorDetail, ApiResponse } from "./api.config";

export const sendSuccess = <T>(
    res: Response,
    data: T,
    message = "Operation successful",
    status = 200,
) => {
    const response: ApiResponse<T> = {
        success: true,
        message,
        data,
    };

    return res.status(status).json(response);
};

export const sendError = (
    res: Response,
    message: string,
    status = 500,
    errors?: ApiErrorDetail[],
) => {
    const response: ApiResponse<null> = {
        success: false,
        message,
        data: null,
        errors,
    };

    return res.status(status).json(response);
};
