import { Router } from 'express';
import * as MessageController from '../controllers/message.controller';

const router = Router();

router.post('/', MessageController.createMessage);
router.get('/', MessageController.getPublicMessages);

// Admin routes
router.get('/all', MessageController.getAllMessages);
router.delete('/:id', MessageController.deleteMessage);
router.put('/:id/approve', MessageController.approveMessage);

export default router;