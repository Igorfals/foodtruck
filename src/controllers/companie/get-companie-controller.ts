import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CompanieService } from '../../db/companie-service'
import { Companie } from '../../interfaces/companie-interface'

const companieServic = new CompanieService()

export class GetCompaniesController {
    getCompanys = async (request): Promise<ControllerResponse> => {
        try {
            const companys: Companie[] = await companieServic.getCompanies(request)
            const total = await companieServic.getCompaniesTotal(request)
            return {
                statusCode: 200,
                resposta: {
                    companys,
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