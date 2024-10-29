import { Companie } from '../interfaces/companie-interface'
import knex from './knex-config'

export class CompanieService {
    setCompanie = async (obj: Companie): Promise<number[]> => {
        return await knex('companies').insert(obj)
    }

    findCompanieById = async (id: number): Promise<Companie> => {
        return await knex('companies').where('company_id', id).first()
    }

    getCompanies = async (): Promise<Companie> => {
        return await knex('companies').select('companies.*')
    }

    updateCompanie = async (obj: Companie): Promise<number> => {
        return await knex('companies').update(obj).where('company_id', obj.company_id)
    }

    deleteCompanie = async (id: number): Promise<Companie> => {
        return await knex('companies').where('company_id', id).del()
    }
}