import { ControllerResponse } from '../interfaces/controller-response-interface'
import { GetProductCategoryController } from '../controllers/product-category/get-product-category-controller'
import { Request, Response } from 'express'

const getController = new GetProductCategoryController()

export class ProductCategoryMiddleware {
    getProductCategory = async (req: Request, res: Response) => {
        const request = req.query
        const dados: ControllerResponse = await getController.getProductCategory(request)
        res.status(dados.statusCode).send(dados.resposta)
    }
}

