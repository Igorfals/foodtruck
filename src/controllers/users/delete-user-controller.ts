import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { UserService } from '../../db/user-service'

const userService = new UserService()

export class DeleteUserController {
    deleteUser = async (id: number): Promise<ControllerResponse> => {
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
            await userService.deleteUser(id)
            return {
                statusCode: 200,
                resposta: {
                    mensagem: 'Usuário deletado com sucesso!'
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