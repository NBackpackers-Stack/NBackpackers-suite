import { Request, Response } from 'express';
import { createUser, findEmail } from '@/respositories/auth/user.repository';
import { AppError } from '@/errors/AppError';
import { hashPassword, verifyPassword } from "@/utils/hashPassword"
import { generateToken } from "@/utils/jwt";

const signupService = async (req: Request, res: Response) => {

    const { name, email, password } = req.body


    if (!name || !email || !password) {
        throw new AppError("All fields are required", 400)
    }

    const existingUser = await findEmail(email)
    if (existingUser) {
        throw new AppError("User already exists", 409)
    }

    const hashedPassword = await hashPassword(password)

    //console.log("hashed password", hashedPassword);

    const user = await createUser({ name, email, password: hashedPassword })

    const token = generateToken(user._id.toString())

    if (user) {
        return { user, token }
    } else {
        throw new Error("Signup failed")
    }

}

const loginService = async (req: Request, res: Response) => {
    const { email, password } = req.body

    console.log("reache in login service");

    if (!email || !password) {
        throw new AppError("All fields are required", 400)
    }

    const existingUser = await findEmail(email)
    if (!existingUser) {
        throw new AppError("User not found", 404)
    }

    const isPasswordValid = await verifyPassword(password, existingUser.password)
    if (!isPasswordValid) {
        throw new AppError("Invalid password", 401)
    }

    const token = generateToken(existingUser._id.toString())
    console.log("servis", token);


    // const token = jwt.sign({ id: existingUser._id }, "secret", { expiresIn: "1h" })

    // res.cookie("token", token, { httpOnly: true, maxAge: 3600000 })

    return { existingUser, token }
}
export default {
    signupService,
    loginService

}
