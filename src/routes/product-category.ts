import { Router } from 'express'
import { ProductCategoryMiddleware } from '../middleware/product-category'

const router = Router()
const middleware = new ProductCategoryMiddleware()

router.get('/', middleware.getProductCategory)

export default router
