import { Router }           from 'express';
import { authenticate }     from '../middlewares/auth.middleware';
import * as GuestController from '../controllers/guest.controller';

const router = Router();

router.post('/', authenticate, GuestController.createGuest);
router.get('/', authenticate, GuestController.getAllGuests);
router.post('/:guestId/rsvp', authenticate, GuestController.confirmRsvp);
router.put('/:guestId', authenticate, GuestController.updateGuest);
router.delete('/:guestId', authenticate, GuestController.deleteGuest);
router.put('/:guestId/cancel', authenticate, GuestController.cancelRsvp);

export default router;