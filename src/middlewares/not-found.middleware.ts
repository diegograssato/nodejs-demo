
import { Request, Response, NextFunction } from "express";
const handleResponse = require("../utils/handleResponse");

export const notFoundHandler = (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    const message = "Resource not found z";

    response.statusCode = 400;
    handleResponse(request, response, message);

};


