import { Category } from '../../interfaces/category-interface'
import { CategoryService } from '../../db/category-service'
import { ControllerResponse } from '../../interfaces/controller-response-interface'

const categoryService = new CategoryService()

export class AddCategoryController {
    setCategory = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['company_id', 'category_name', 'icon']
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
            const addCategory: Category = {
                company_id: request.company_id,
                category_name: request.category_name,
                icon: request.icon
            }
            const category = await categoryService.setCategory(addCategory)
            const categoryReponse = await categoryService.findCategoryById(category[0])
            return {
                statusCode: 200,
                resposta: {
                    categoryReponse,
                    mensagem: 'Category cadastrada com sucesso!'
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