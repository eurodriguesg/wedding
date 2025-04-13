import { Router }    from 'express';
import guestRoutes   from './guest.routes';
import giftRoutes    from './gift.routes';
import messageRoutes from './message.routes';
import authRoutes    from './auth.routes';

const router = Router();

router.use('/guests', guestRoutes);
router.use('/gifts', giftRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);

export default router;

