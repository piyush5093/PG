import express from 'express';
import {
  getMyRoommateRequests,
  getRoommateMatches,
  sendRoommateRequest
} from '../controllers/roommateController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/matches', protect, authorizeRoles('student'), getRoommateMatches);
router.get('/requests', protect, authorizeRoles('student'), getMyRoommateRequests);
router.post('/requests', protect, authorizeRoles('student'), sendRoommateRequest);

export default router;
