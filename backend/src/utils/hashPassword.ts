import argon2 from "argon2";


const hashPassword = async (password: string) => {
    return await argon2.hash(password)
}

const verifyPassword = async (password: string, hash: string) => {
    return await argon2.verify(hash, password)
}

export { hashPassword, verifyPassword }
