import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as jwt.JwtPayload;

        if (!decoded || !decoded.userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // @ts-ignore
        req.userId = decoded.userId;
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}
