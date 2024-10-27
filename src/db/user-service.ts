import { User } from '../interfaces/user-interface'
import knex from './knex-config'

export class UserService {
    setUser = async (obj: User): Promise<number[]> => {
        return await knex('users').insert(obj)
    }

    findUserById = async (id: number): Promise<User> => {
        return await knex('users').where('user_id', id).first()
    }

    findUserByEmail = async (email: string): Promise<User> => {
        return await knex('users').where('user_email', email).first()
    }
}