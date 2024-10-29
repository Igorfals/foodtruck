import { Product } from '../interfaces/product'
import knex from './knex-config'

export class ProductService {
    setProduct = async (obj: Product): Promise<number[]> => {
        return await knex('products').insert(obj)
    }

    findProductById = async (id: number): Promise<Product> => {
        return await knex('products').where('product_id', id).first()
    }

    getProducts = async (): Promise<Product> => {
        return await knex('products').select('products.*')
    }

    updateProduct = async (obj: Product): Promise<number> => {
        return await knex('products').update(obj).where('product_id', obj.product_id)
    }

    deleteProduct = async (id: number): Promise<Product> => {
        return await knex('products').where('product_id', id).del()
    }
}