import { Companie } from '../../interfaces/companie-interface'
import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CompanieService } from '../../db/companie-service'

const companieService = new CompanieService()

export class UpdateCompanieController {
    updateCompanie = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['company_id']
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
            const updateCompanie: Companie = {
                company_id: request.company_id,
                company_name: request.company_name,
                company_address: request.company_address,
                company_phone: request.company_phone
            }
            await companieService.updateCompanie(updateCompanie)
            const companieReponse = await companieService.findCompanieById(request.company_id)
            return {
                statusCode: 200,
                resposta: {
                    companieReponse,
                    mensagem: 'Companie alterada com sucesso!'
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