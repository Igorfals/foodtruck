import { Router } from 'express'
import { CategoryMiddleware } from '../middleware/category'

const router = Router()
const middleware = new CategoryMiddleware()

router.get('/', middleware.getCategories)
router.post('/add', middleware.setCategory)
router.put('/update', middleware.updateCategory)
router.delete('/delete/:id', middleware.deleteCategory)

export default router
