import { Router } from 'express';
import guestRoutes from './guest.routes';
import giftRoutes from './gift.routes';
import messageRoutes from './message.routes';

const router = Router();

router.use('/guests', guestRoutes);
router.use('/gifts', giftRoutes);
router.use('/messages', messageRoutes);

export default router;
