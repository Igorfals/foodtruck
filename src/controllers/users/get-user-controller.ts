import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { UserService } from '../../db/user-service'
import { User } from '../../interfaces/user-interface'

const userService = new UserService()

export class GetUserController {
    getUser = async (): Promise<ControllerResponse> => {
        try {
            const user: User = await userService.getUser()
            return {
                statusCode: 200,
                resposta: {
                    user
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