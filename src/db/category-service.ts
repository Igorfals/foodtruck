import { Category } from '../interfaces/category-interface'
import { Filter } from '../interfaces/filter-interface'
import knex from './knex-config'

export class CategoryService {
    setCategory = async (obj: Category): Promise<number[]> => {
        return await knex('categories').insert(obj)
    }

    findCategoryById = async (id: number): Promise<Category> => {
        return await knex('categories').where('category_id', id).first()
    }

    getCategories = async (request: Filter): Promise<Category[]> => {
        const pesquisa: string = request.pesquisa
        return await knex('categories').select('categories.*')
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('category_name', 'like', `%${pesquisa}%`)
                }
            })
            .limit(request.limit || 10000).offset(request.offset || 0)
            .orderBy('category_id', 'desc')
    }

    getCategoriesTotal = async (request: Filter): Promise<number> => {
        const pesquisa: string = request.pesquisa
        const result = await knex('categories').count('category_id as total').first()
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('category_name', 'like', `%${pesquisa}%`)
                }
            })
        return Number(result.total)
    }

    updateCategory = async (obj: Category): Promise<number> => {
        return await knex('categories').update(obj).where('category_id', obj.category_id)
    }

    deleteCategory = async (id: number): Promise<Category> => {
        return await knex('categories').where('category_id', id).del()
    }
}