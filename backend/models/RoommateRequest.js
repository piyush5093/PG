import mongoose from 'mongoose';

const roommateRequestSchema = new mongoose.Schema(
  {
    fromStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    toStudent: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, trim: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' }
  },
  { timestamps: true }
);

roommateRequestSchema.index({ fromStudent: 1, toStudent: 1 }, { unique: true });

const RoommateRequest = mongoose.model('RoommateRequest', roommateRequestSchema);
export default RoommateRequest;
