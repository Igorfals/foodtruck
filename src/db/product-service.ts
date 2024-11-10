import { Filter } from '../interfaces/filter-interface'
import { Product } from '../interfaces/product'
import knex from './knex-config'

export class ProductService {
    setProduct = async (obj: Product): Promise<number[]> => {
        return await knex('products').insert(obj)
    }

    findProductById = async (id: number): Promise<Product> => {
        return await knex('products').where('product_id', id).first()
    }

    getProducts = async (request: Filter): Promise<Product[]> => {
        const pesquisa: string = request.pesquisa
        return await knex('products').select('products.*')
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('product_name', 'like', `%${pesquisa}%`)
                }
            })
            .limit(request.limit || 10000).offset(request.offset || 0)
            .orderBy('product_id', 'desc')
    }

    getProductsTotal = async (request: Filter): Promise<number> => {
        const pesquisa: string = request.pesquisa
        const result = await knex('products').count('product_id as total').first()
            .andWhere(function (): void {
                if (pesquisa) {
                    this.where('product_name', 'like', `%${pesquisa}%`)
                }
            })
        return Number(result.total)
    }

    updateProduct = async (obj: Product): Promise<number> => {
        return await knex('products').update(obj).where('product_id', obj.product_id)
    }

    deleteProduct = async (id: number): Promise<Product> => {
        return await knex('products').where('product_id', id).del()
    }
}