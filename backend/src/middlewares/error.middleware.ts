import { Request, Response, NextFunction } from "express";
import { AppError } from "@/errors/AppError";
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    console.log("Error is", err.message);

    if (err instanceof AppError) {
        console.log("Error is", err.message);
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    }

    res.status(500).json({
        success: false,
        message: err.message

    });

}

export default errorHandler