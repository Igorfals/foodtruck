import { Router } from 'express'
import { ProductMiddleware } from '../middleware/product'

const router = Router()
const middleware = new ProductMiddleware()

router.get('/', middleware.getProducts)
router.post('/add', middleware.setProduct)
router.put('/update', middleware.updateProduct)
router.delete('/delete/:id', middleware.deleteProduct)

export default router
