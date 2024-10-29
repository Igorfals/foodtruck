import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CategoryService } from '../../db/category-service'
import { Category } from '../../interfaces/category-interface'

const categoryService = new CategoryService()

export class GetCategoriesController {
    getCategories = async (): Promise<ControllerResponse> => {
        try {
            const category: Category = await categoryService.getCategories()
            return {
                statusCode: 200,
                resposta: {
                    category
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