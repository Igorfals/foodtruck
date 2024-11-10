import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CategoryService } from '../../db/category-service'
import { Category } from '../../interfaces/category-interface'

const categoryService = new CategoryService()

export class GetCategoriesController {
    getCategories = async (request): Promise<ControllerResponse> => {
        try {
            const categorys: Category[] = await categoryService.getCategories(request)
            const total = await categoryService.getCategoriesTotal(request)
            return {
                statusCode: 200,
                resposta: {
                    categorys,
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