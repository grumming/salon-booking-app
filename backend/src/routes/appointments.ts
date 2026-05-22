import express from 'express';
import {
  getAppointments,
  getAvailableSlots,
  bookAppointment,
  cancelAppointment
} from '../controllers/appointmentController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();

router.get('/', authMiddleware, getAppointments);
router.get('/available-slots', getAvailableSlots);
router.post('/', authMiddleware, bookAppointment);
router.delete('/:id', authMiddleware, cancelAppointment);

export default router;
