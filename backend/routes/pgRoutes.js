import express from 'express';
import {
  createPG,
  deletePG,
  getOwnerPGs,
  getPGById,
  getPGs,
  updatePG
} from '../controllers/pgController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getPGs).post(protect, authorizeRoles('owner'), createPG);
router.get('/owner/my-listings', protect, authorizeRoles('owner'), getOwnerPGs);
router.route('/:id').get(getPGById).put(protect, authorizeRoles('owner'), updatePG).delete(protect, authorizeRoles('owner'), deletePG);

export default router;
