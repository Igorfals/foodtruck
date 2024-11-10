import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { Product } from '../../interfaces/product'
import { ProductService } from '../../db/product-service'

const productService = new ProductService()

export class GetProductsController {
    getProducts = async (request): Promise<ControllerResponse> => {
        try {
            const products: Product[] = await productService.getProducts(request)
            const total = await productService.getProductsTotal(request)
            return {
                statusCode: 200,
                resposta: {
                    products,
                    total
                }
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                resposta: {
                    mensagem: 'Erro no servidor.'
                }
            }
        }
    }
}