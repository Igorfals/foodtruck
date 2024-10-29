import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { ProductService } from '../../db/product-service'

const productService = new ProductService()

export class DeleteProductController {
    deleteProduct = async (id: number): Promise<ControllerResponse> => {
        try {
            if (typeof id !== 'number') {
                return {
                    statusCode: 400,
                    resposta: {
                        mensagem: 'Informação invalida, tente novamente.'
                    }
                }
            }
            if (isNaN(id)) {
                return {
                    statusCode: 400,
                    resposta: {
                        mensagem: "Informação invalida, tente novamente."
                    }
                }
            }
            await productService.deleteProduct(id)
            return {
                statusCode: 200,
                resposta: {
                    mensagem: 'Product deletado com sucesso!'
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