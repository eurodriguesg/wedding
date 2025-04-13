import { Router } from 'express';

import * as AuthController from '../controllers/auth.controller';

const router = Router();

router.post('/register', AuthController.register); // use apenas 1x pra criar o admin
router.post('/login', AuthController.login);

export default router;