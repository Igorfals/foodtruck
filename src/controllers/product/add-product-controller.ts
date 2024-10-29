import { Product } from '../../interfaces/product'
import { ProductService } from '../../db/product-service'
import { ControllerResponse } from '../../interfaces/controller-response-interface'

const productService = new ProductService()

export class AddProductController {
    setProduct = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['category_id', 'product_name', 'product_price']
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
            const addProduct: Product = {
                category_id: request.category_id,
                product_name: request.product_name,
                product_price: request.product_price,
                product_description: request.product_description
            }
            const product = await productService.setProduct(addProduct)
            const productReponse = await productService.findProductById(product[0])
            return {
                statusCode: 200,
                resposta: {
                    productReponse,
                    mensagem: 'Product cadastrado com sucesso!'
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