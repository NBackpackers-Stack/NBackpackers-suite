import mongoose from "mongoose";
import userModel from "@/models/users/user.model"

const findEmail = async (email: string) => {
    return await userModel.findOne({ email })
}

const createUser = async ({ name, email, password }: any) => {
    return await userModel.create({ name, email, password })
}

export {
    findEmail,
    createUser
}