import { Router } from 'express'
import authRoutes from './auth.routes'
import bookRoutes from './book.routes'

const router = Router()

router.use('/api', authRoutes)
router.use('/api', bookRoutes)

export default router