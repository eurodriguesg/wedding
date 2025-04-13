import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import * as DashboardController from '../controllers/dashboard.controller';

const router = Router();

router.get('/dashboard', authenticate, DashboardController.getDashboard);
router.get('/dashboard/export-guests', authenticate, DashboardController.exportGuests);

export default router;
