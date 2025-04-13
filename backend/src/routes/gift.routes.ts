import { Router }          from 'express';
import { authenticate }    from '../middlewares/auth.middleware';
import * as GiftController from '../controllers/gift.controller';

const router = Router();

router.post('/', authenticate, GiftController.createGift); // admin
router.get('/', authenticate, GiftController.getAllGifts);
router.put('/:id', authenticate, GiftController.updateGift); // admin
router.post('/:id/purchase', authenticate, GiftController.purchaseGift);

export default router;
