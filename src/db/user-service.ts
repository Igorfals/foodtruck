import { Filter } from '../interfaces/filter-interface'
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

    getUsers = async (request: Filter): Promise<User[]> => {
        const pesquisa: string = request.pesquisa
        return await knex('users').select('users.*')
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('company_name', 'like', `%${pesquisa}%`)
                }
            })
            .limit(request.limit || 10000).offset(request.offset || 0)
            .orderBy('company_id', 'desc')
    }

    getUsersTotal = async (request: Filter): Promise<number> => {
        const pesquisa: string = request.pesquisa
        const result = await knex('users').count('user_id as total').first()
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('company_name', 'like', `%${pesquisa}%`)
                }
            })
        return Number(result.total)
    }

    updateUser = async (obj: User): Promise<number> => {
        return await knex('users').update(obj).where('user_id', obj.user_id)
    }

    deleteUser = async (id: number): Promise<User> => {
        return await knex('users').where('user_id', id).del()
    }
}