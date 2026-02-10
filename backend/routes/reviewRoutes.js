import express from 'express';
import { addReview, getReviewsForOwner } from '../controllers/reviewController.js';
import { authorizeRoles, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('student'), addReview);
router.get('/owner', protect, authorizeRoles('owner'), getReviewsForOwner);

export default router;
