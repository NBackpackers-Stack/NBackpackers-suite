import { Request, Response } from 'express';
import authService from '@/services/auth/auth.service';


const signup = async (req: Request, res: Response) => {
    const user = await authService.signupService(req, res)

    res.status(201).json({ success: true, message: "Signup successful", user })
}

const login = async (req: Request, res: Response) => {
    const user = await authService.loginService(req, res)
    res.status(200).json({ success: true, message: "Login successful", user })
}

export default {
    signup,
    login
}