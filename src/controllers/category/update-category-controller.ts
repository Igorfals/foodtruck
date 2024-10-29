import { Category } from '../../interfaces/category-interface'
import { CategoryService } from '../../db/category-service'
import { ControllerResponse } from '../../interfaces/controller-response-interface'

const categoryService = new CategoryService()

export class UpdateCategoryController {
    updateCategory = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['category_id']
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
            const updateCategory: Category = {
                category_id: request.category_id,
                company_id: request.company_id,
                category_name: request.category_name
            }
            await categoryService.updateCategory(updateCategory)
            const categoryReponse = await categoryService.findCategoryById(request.category_id)
            return {
                statusCode: 200,
                resposta: {
                    categoryReponse,
                    mensagem: 'Category alterada com sucesso!'
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