import { Router } from 'express';
import * as GuestController from '../controllers/guest.controller';

const router = Router();

router.post('/', GuestController.createGuest);
router.get('/', GuestController.getAllGuests);
router.post('/:id/rsvp', GuestController.confirmRsvp);

export default router;