import { ControllerResponse } from '../interfaces/controller-response-interface'
import { AddUserController, GetUserController, UpdateUserController, DeleteUserController } from '../controllers/users/index'
import { Request, Response } from 'express'

const addController = new AddUserController()
const getController = new GetUserController()
const updateController = new UpdateUserController()
const deleteController = new DeleteUserController()

export class UserMiddleware {
    setUser = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await addController.setUser(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    getUser = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await getController.getUser()
        res.status(dados.statusCode).send(dados.resposta)
    }

    updateUser = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await updateController.updateUser(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    deleteUser = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await deleteController.deleteUser(parseFloat(req.params.id))
        res.status(dados.statusCode).send(dados.resposta)
    }
}

