import Review from '../models/Review.js';
import PG from '../models/PG.js';

const recalculatePGRating = async (pgId) => {
  const reviews = await Review.find({ pg: pgId });
  const pg = await PG.findById(pgId);

  if (!pg) return;

  pg.numReviews = reviews.length;
  pg.rating = reviews.length
    ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length
    : 0;

  await pg.save();
};

export const addReview = async (req, res) => {
  const { pgId, rating, comment } = req.body;

  const pg = await PG.findById(pgId);
  if (!pg) return res.status(404).json({ message: 'PG not found' });

  try {
    const review = await Review.create({
      pg: pgId,
      student: req.user._id,
      rating,
      comment
    });

    await recalculatePGRating(pgId);
    return res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'You already reviewed this PG' });
    }
    return res.status(500).json({ message: 'Failed to add review' });
  }
};

export const getReviewsForOwner = async (req, res) => {
  const pgs = await PG.find({ owner: req.user._id }).select('_id');
  const pgIds = pgs.map((pg) => pg._id);

  const reviews = await Review.find({ pg: { $in: pgIds } })
    .populate('student', 'name email')
    .populate('pg', 'title');

  res.json(reviews);
};
