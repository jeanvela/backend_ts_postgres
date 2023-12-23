import { Router } from 'express'
import authRoutes from './auth.routes'
import bookRoutes from './book.routes'
import roleRoutes from './role.routes'
import adminRoutes from './admin.routes'

const router = Router()

router.use('/api', authRoutes)
router.use('/api', bookRoutes)
router.use('/api', roleRoutes)
router.use('/api', adminRoutes)

export default router