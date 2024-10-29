import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CompanieService } from '../../db/companie-service'
import { Companie } from '../../interfaces/companie-interface'

const companieServic = new CompanieService()

export class GetCompaniesController {
    getCompanies = async (): Promise<ControllerResponse> => {
        try {
            const companie: Companie = await companieServic.getCompanies()
            return {
                statusCode: 200,
                resposta: {
                    companie
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