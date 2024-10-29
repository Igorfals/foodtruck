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

    getUsers = async (): Promise<User> => {
        return await knex('users').select('users.*')
    }

    updateUser = async (obj: User): Promise<number> => {
        return await knex('users').update(obj).where('user_id', obj.user_id)
    }

    deleteUser = async (id: number): Promise<User> => {
        return await knex('users').where('user_id', id).del()
    }
}