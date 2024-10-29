import { Category } from '../interfaces/category-interface'
import knex from './knex-config'

export class CategoryService {
    setCategory = async (obj: Category): Promise<number[]> => {
        return await knex('categories').insert(obj)
    }

    findCategoryById = async (id: number): Promise<Category> => {
        return await knex('categories').where('category_id', id).first()
    }

    getCategories = async (): Promise<Category> => {
        return await knex('categories').select('categories.*')
    }

    updateCategory = async (obj: Category): Promise<number> => {
        return await knex('categories').update(obj).where('category_id', obj.category_id)
    }

    deleteCategory = async (id: number): Promise<Category> => {
        return await knex('categories').where('category_id', id).del()
    }
}