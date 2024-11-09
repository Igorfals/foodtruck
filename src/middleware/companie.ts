import { ControllerResponse } from '../interfaces/controller-response-interface'
import { GetCompaniesController, AddCompanieController, UpdateCompanieController, DeleteCompanieController } from '../controllers/companie/index'
import { Request, Response } from 'express'

const getController = new GetCompaniesController()
const addController = new AddCompanieController()
const updateController = new UpdateCompanieController()
const deleteController = new DeleteCompanieController()

export class CompanieMiddleware {
    setCompanie = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await addController.setCompanie(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    getCompanys = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await getController.getCompanys()
        res.status(dados.statusCode).send(dados.resposta)
    }

    updateCompanie = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await updateController.updateCompanie(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    deleteCompanie = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await deleteController.deleteCompanie(parseFloat(req.params.id))
        res.status(dados.statusCode).send(dados.resposta)
    }
}

