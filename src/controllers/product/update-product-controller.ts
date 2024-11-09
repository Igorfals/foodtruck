import { Product } from '../../interfaces/product'
import { ProductService } from '../../db/product-service'
import { ControllerResponse } from '../../interfaces/controller-response-interface'

const productService = new ProductService()

export class UpdateProductController {
    updateProduct = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['product_id']
            for (const field of requireFields) {
                if (!(field in request)) {
                    return {
                        statusCode: 400,
                        resposta: {
                            mensagem: `O campo ${field} não foi fornecido. `
                        }
                    }
                }
            }
            const updateProduct: Product = {
                product_id: request.product_id,
                category_id: request.category_id,
                product_name: request.product_name,
                product_price: request.product_price,
                product_description: request.product_description,
                image: request.image,
                increments: JSON.stringify(request.increments)
            }
            await productService.updateProduct(updateProduct)
            const productReponse = await productService.findProductById(request.product_id)
            return {
                statusCode: 200,
                resposta: {
                    productReponse,
                    mensagem: 'Product alterado com sucesso!'
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