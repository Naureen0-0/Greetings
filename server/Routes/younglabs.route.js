//younglabs.controller.js
import express from 'express';
import { greetUser, getgreeting } from '../Controllers/younglabs.controller.js';

const router = express.Router();

//Routing
router.post('/greet', greetUser);
router.get('/greetings', getgreeting);

export default router;