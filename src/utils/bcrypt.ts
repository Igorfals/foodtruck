import bcrypt from 'bcrypt'

export const passwordBcrypt = (hash: string, salt: number): Promise<string> => {
    return bcrypt.hash(hash, salt)
}

export const compareBcrypt = (password: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(password, hash)
}