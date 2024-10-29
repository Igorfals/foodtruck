import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CategoryService } from '../../db/category-service'

const categoryService = new CategoryService()

export class DeleteCategoryController {
    deleteCategory = async (id: number): Promise<ControllerResponse> => {
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
            await categoryService.deleteCategory(id)
            return {
                statusCode: 200,
                resposta: {
                    mensagem: 'Category deletado com sucesso!'
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