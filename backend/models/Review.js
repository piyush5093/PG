import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    pg: { type: mongoose.Schema.Types.ObjectId, ref: 'PG', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

reviewSchema.index({ pg: 1, student: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
