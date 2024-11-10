import { Companie } from '../interfaces/companie-interface'
import { Filter } from '../interfaces/filter-interface'
import knex from './knex-config'

export class CompanieService {
    setCompanie = async (obj: Companie): Promise<number[]> => {
        return await knex('companies').insert(obj)
    }

    findCompanieById = async (id: number): Promise<Companie> => {
        return await knex('companies').where('company_id', id).first()
    }

    getCompanies = async (request: Filter): Promise<Companie[]> => {
        const pesquisa: string = request.pesquisa
        return await knex('companies').select('companies.*')
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('company_name', 'like', `%${pesquisa}%`)
                }
            })
            .limit(request.limit || 10000).offset(request.offset || 0)
            .orderBy('company_id', 'desc')
    }

    getCompaniesTotal = async (request: Filter): Promise<number> => {
        const pesquisa: string = request.pesquisa
        const result = await knex('companies').count('company_id as total').first()
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('company_name', 'like', `%${pesquisa}%`)
                }
            })
        return Number(result.total)
    }

    updateCompanie = async (obj: Companie): Promise<number> => {
        return await knex('companies').update(obj).where('company_id', obj.company_id)
    }

    deleteCompanie = async (id: number): Promise<Companie> => {
        return await knex('companies').where('company_id', id).del()
    }
}