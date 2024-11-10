import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { UserService } from '../../db/user-service'
import { User } from '../../interfaces/user-interface'

const userService = new UserService()

export class GetUserController {
    getUsers = async (request): Promise<ControllerResponse> => {
        try {
            const users: User[] = await userService.getUsers(request)
            const total = await userService.getUsersTotal(request)
            return {
                statusCode: 200,
                resposta: {
                    users,
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