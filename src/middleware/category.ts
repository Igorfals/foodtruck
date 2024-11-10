import { ControllerResponse } from '../interfaces/controller-response-interface'
import { GetCategoriesController, AddCategoryController, UpdateCategoryController, DeleteCategoryController } from '../controllers/category'
import { Request, Response } from 'express'

const getController = new GetCategoriesController()
const addController = new AddCategoryController()
const updateController = new UpdateCategoryController()
const deleteController = new DeleteCategoryController()

export class CategoryMiddleware {
    setCategory = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await addController.setCategory(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    getCategories = async (req: Request, res: Response) => {
        const request = req.query
        const dados: ControllerResponse = await getController.getCategories(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    updateCategory = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await updateController.updateCategory(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    deleteCategory = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await deleteController.deleteCategory(parseFloat(req.params.id))
        res.status(dados.statusCode).send(dados.resposta)
    }
}

