import { Router } from 'express';
import * as GiftController from '../controllers/gift.controller';

const router = Router();

router.post('/', GiftController.createGift); // admin
router.get('/', GiftController.getAllGifts);
router.put('/:id', GiftController.updateGift); // admin
router.post('/:id/purchase', GiftController.purchaseGift);

export default router;
