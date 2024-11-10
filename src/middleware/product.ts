import { ControllerResponse } from '../interfaces/controller-response-interface'
import { GetProductsController, AddProductController, UpdateProductController, DeleteProductController } from '../controllers/product'
import { Request, Response } from 'express'

const getController = new GetProductsController()
const addController = new AddProductController()
const updateController = new UpdateProductController()
const deleteController = new DeleteProductController()

export class ProductMiddleware {
    setProduct = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await addController.setProduct(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    getProducts = async (req: Request, res: Response) => {
        const request = req.query
        const dados: ControllerResponse = await getController.getProducts(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    updateProduct = async (req: Request, res: Response) => {
        const request = req.body
        const dados: ControllerResponse = await updateController.updateProduct(request)
        res.status(dados.statusCode).send(dados.resposta)
    }

    deleteProduct = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await deleteController.deleteProduct(parseFloat(req.params.id))
        res.status(dados.statusCode).send(dados.resposta)
    }
}

