import express from 'express';
import { getStudentProfile, upsertStudentProfile } from '../controllers/studentController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router
  .route('/profile')
  .get(protect, authorizeRoles('student'), getStudentProfile)
  .put(protect, authorizeRoles('student'), upsertStudentProfile);

export default router;
