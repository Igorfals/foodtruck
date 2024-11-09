import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CategoryService } from '../../db/category-service'
import { ProductService } from '../../db/product-service'

const categoryService = new CategoryService()
const productService = new ProductService()

export class GetProductCategoryController {
    getProductCategory = async (): Promise<ControllerResponse> => {
        try {
            const categories = await categoryService.getCategories()
            const products = await productService.getProducts()
            const categoriesWithProducts = categories.map(category => ({
                ...category,
                products: products.filter(product => product.category_id === category.category_id)
            }))
            return {
                statusCode: 200,
                resposta: {
                    categories: categoriesWithProducts
                }
            }
        } catch (error) {
            console.error(error)
            return {
                statusCode: 500,
                resposta: {
                    mensagem: 'Erro no servidor.'
                }
            }
        }
    }
}
