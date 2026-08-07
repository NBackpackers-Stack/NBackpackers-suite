import jwt from 'jsonwebtoken'
import dotenv from "dotenv"

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET;

export const generateToken = (payload: string) => {
    console.log("been to jwt file");

    return jwt.sign({ payload }, SECRET_KEY!, { expiresIn: "12h" })
}

export const verifyToken = (token: string) => {
    return jwt.verify(token, SECRET_KEY!)
}   