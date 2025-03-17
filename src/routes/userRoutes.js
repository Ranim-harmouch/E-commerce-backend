import express from 'express';
import { createUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', createUser);
router.get('/:id', getUserById);

export default router;