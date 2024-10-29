import { Router } from 'express'
import { UserMiddleware } from '../middleware/user'

const router = Router()
const middleware = new UserMiddleware()

router.get('/', middleware.getUsers)
router.post('/add', middleware.setUser)
router.put('/update', middleware.updateUser)
router.delete('/delete/:id', middleware.deleteUser)

export default router
