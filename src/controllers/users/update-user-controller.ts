import { User } from '../../interfaces/user-interface'
import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { UserService } from '../../db/user-service'
import { isValidEmail } from '../../utils/is-valid-email'
import { passwordBcrypt } from '../../utils/bcrypt'

const userService = new UserService()

export class UpdateUserController {
    updateUser = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['user_id']
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
            if (!isValidEmail(request.user_email)) {
                return {
                    statusCode: 400,
                    resposta: {
                        mensagem: 'Email invalido.'
                    }
                }
            }
            const password = await passwordBcrypt(request.user_password, 8)
            const updateUser: User = {
                user_id: request.user_id,
                company_id: request.company_id,
                user_name: request.user_name,
                user_email: request.user_email,
                user_password: password,
                user_phone: request.user_phone
            }
            await userService.updateUser(updateUser)
            const userReponse = await userService.findUserById(request.user_id)
            return {
                statusCode: 200,
                resposta: {
                    userReponse,
                    mensagem: 'Usuario atualizado com sucesso!'
                }
            }
        } catch (error) {
            console.log(error);
            if (error.errno === 1062) {
                return {
                    statusCode: 400,
                    resposta: {
                        mensagem: 'Email já está em uso'
                    }
                }
            }
            return {
                statusCode: 500,
                resposta: {
                    mensagem: 'Erro no servidor.'
                }
            }
        }
    }
}