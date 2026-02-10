import User from '../models/User.js';
import RoommateRequest from '../models/RoommateRequest.js';

const getCompatibilityScore = (baseProfile, candidateProfile) => {
  if (!baseProfile || !candidateProfile) return 0;

  let score = 0;
  const budgetDiff = Math.abs((baseProfile.budget || 0) - (candidateProfile.budget || 0));
  if (budgetDiff <= 1000) score += 30;
  else if (budgetDiff <= 3000) score += 20;
  else if (budgetDiff <= 5000) score += 10;

  if (baseProfile.sleepTime && baseProfile.sleepTime === candidateProfile.sleepTime) score += 20;
  if (
    baseProfile.studyHabits &&
    candidateProfile.studyHabits &&
    baseProfile.studyHabits.toLowerCase() === candidateProfile.studyHabits.toLowerCase()
  ) {
    score += 20;
  }

  if (baseProfile.smoking === candidateProfile.smoking) score += 10;
  if (baseProfile.drinking === candidateProfile.drinking) score += 10;

  const cleanlinessDiff = Math.abs(
    (baseProfile.cleanlinessLevel || 0) - (candidateProfile.cleanlinessLevel || 0)
  );
  if (cleanlinessDiff === 0) score += 10;
  else if (cleanlinessDiff === 1) score += 5;

  return score;
};

export const getRoommateMatches = async (req, res) => {
  const me = await User.findById(req.user._id);

  if (!me?.profile) {
    return res.status(400).json({ message: 'Please complete your student profile first' });
  }

  const candidates = await User.find({
    _id: { $ne: me._id },
    role: 'student',
    profile: { $exists: true }
  }).select('-password');

  const matches = candidates
    .map((candidate) => ({
      user: candidate,
      score: getCompatibilityScore(me.profile, candidate.profile)
    }))
    .sort((a, b) => b.score - a.score);

  res.json(matches);
};

export const sendRoommateRequest = async (req, res) => {
  const { toStudent, message } = req.body;

  if (String(req.user._id) === String(toStudent)) {
    return res.status(400).json({ message: 'You cannot send request to yourself' });
  }

  try {
    const request = await RoommateRequest.create({
      fromStudent: req.user._id,
      toStudent,
      message
    });

    res.status(201).json(request);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Request already sent' });
    }
    return res.status(500).json({ message: 'Failed to send request' });
  }
};

export const getMyRoommateRequests = async (req, res) => {
  const requests = await RoommateRequest.find({
    $or: [{ fromStudent: req.user._id }, { toStudent: req.user._id }]
  })
    .populate('fromStudent', 'name email')
    .populate('toStudent', 'name email')
    .sort({ createdAt: -1 });

  res.json(requests);
};
