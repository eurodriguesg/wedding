import { Router }             from 'express';
import { authenticate }       from '../middlewares/auth.middleware';
import * as MessageController from '../controllers/message.controller';

const router = Router();

router.post('/', authenticate, MessageController.createMessage);
router.get('/', authenticate, MessageController.getPublicMessages);

// Admin routes
router.get('/all', authenticate, MessageController.getAllMessages);
router.delete('/:id', authenticate, MessageController.deleteMessage);
router.put('/:id/approve', authenticate, MessageController.approveMessage);

export default router;