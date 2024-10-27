import { User } from '../../interfaces/user-interface'
import { ControllerResponse } from '../../interfaces/controller-response-interface'
import { UserService } from '../../db/user-service'
import { isValidEmail } from '../../utils/is-valid-email'
import { passwordBcrypt } from '../../utils/bcrypt'

const userService = new UserService()

export class AddUserController {
    setUser = async (request): Promise<ControllerResponse> => {
        try {
            const requireFields = ['company_id', 'user_name', 'user_email', 'user_password']
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
            const user = await userService.findUserByEmail(request.user_email)
            if (!user) {
                return {
                    statusCode: 400,
                    resposta: {
                        mensagem: 'O email já está em uso.'
                    }
                }
            }
            const password = await passwordBcrypt(request.user_password, 8)
            const addUser: User = {
                company_id: request.company_id,
                user_name: request.user_name,
                user_email: request.user_email,
                user_password: password,
                user_phone: request.user_phone
            }
            const userId = await userService.setUser(addUser)
            const userReponse = await userService.findUserById(userId[0])
            return {
                statusCode: 200,
                resposta: {
                    userReponse,
                    mensagem: 'Usuario cadastrado com sucesso!'
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