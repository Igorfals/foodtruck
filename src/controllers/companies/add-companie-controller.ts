import { Companie } from '../../interfaces/companie-interface'
import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CompanieService } from '../../db/companie-service'

const companieService = new CompanieService()

export class AddCompanieController {
    setCompanie = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['company_name']
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
            const addCompanie: Companie = {
                company_name: request.company_name,
                company_address: request.company_address,
                company_phone: request.company_phone
            }
            const companie = await companieService.setCompanie(addCompanie)
            const companieReponse = await companieService.findCompanieById(companie[0])
            return {
                statusCode: 200,
                resposta: {
                    companieReponse,
                    mensagem: 'Companie cadastrada com sucesso!'
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