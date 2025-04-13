import { Router }    from 'express';
import guestRoutes   from '../routes/guest.routes';
import giftRoutes    from '../routes/gift.routes';
import messageRoutes from '../routes/message.routes';
import authRoutes    from '../routes/auth.routes';
import adminRoutes   from '../routes/admin.routes';

const router = Router();

router.use('/guests', guestRoutes);
router.use('/gifts', giftRoutes);
router.use('/messages', messageRoutes);
router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);

export default router;

