import { Router } from 'express'
import { CompanieMiddleware } from '../middleware/companie'

const router = Router()
const middleware = new CompanieMiddleware()

router.get('/', middleware.getCompanies)
router.post('/add', middleware.setCompanie)
router.put('/update', middleware.updateCompanie)
router.delete('/delete/:id', middleware.deleteCompanie)

export default router
