import mongoose from 'mongoose';

const pgSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    images: [{ type: String }],
    rent: { type: Number, required: true },
    location: { type: String, required: true, index: true },
    facilities: [{ type: String }],
    description: { type: String, required: true },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 }
  },
  { timestamps: true }
);

const PG = mongoose.model('PG', pgSchema);
export default PG;
