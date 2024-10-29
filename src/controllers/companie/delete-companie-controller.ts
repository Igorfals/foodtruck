import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { CompanieService } from '../../db/companie-service'

const companieService = new CompanieService()

export class DeleteCompanieController {
    deleteCompanie = async (id: number): Promise<ControllerResponse> => {
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
            await companieService.deleteCompanie(id)
            return {
                statusCode: 200,
                resposta: {
                    mensagem: 'Companie deletado com sucesso!'
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