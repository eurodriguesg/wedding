import { Router }    from 'express';
import guestRoutes   from './guest.routes';
import giftRoutes    from './gift.routes';
import messageRoutes from './message.routes';
import authRoutes    from './auth.routes';
import adminRoutes   from './admin.routes';

const router = Router();

router.use('/guests', guestRoutes);
router.use('/gifts', giftRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;

