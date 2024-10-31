import { ControllerResponse } from '../interfaces/controller-response-interface'
import { GetProductCategoryController } from '../controllers/product-category/get-product-category-controller'
import { Request, Response } from 'express'

const getController = new GetProductCategoryController()

export class ProductCategoryMiddleware {
    getProductCategory = async (req: Request, res: Response) => {
        const dados: ControllerResponse = await getController.getProductCategory()
        res.status(dados.statusCode).send(dados.resposta)
    }
}

