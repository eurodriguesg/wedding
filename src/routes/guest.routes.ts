import { Router }           from 'express';
import { authenticate }     from '../middlewares/auth.middleware';
import * as GuestController from '../controllers/guest.controller';

const router = Router();

router.post('/', authenticate, GuestController.createGuest);
router.get('/', authenticate, GuestController.getAllGuests);
router.post('/:id/rsvp', authenticate, GuestController.confirmRsvp);

export default router;