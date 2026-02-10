import User from '../models/User.js';

export const upsertStudentProfile = async (req, res) => {
  const student = await User.findById(req.user._id);
  if (!student || student.role !== 'student') {
    return res.status(403).json({ message: 'Only students can update profile' });
  }

  student.profile = {
    ...student.profile,
    ...req.body
  };

  const updated = await student.save();
  return res.json({ message: 'Profile updated', profile: updated.profile });
};

export const getStudentProfile = async (req, res) => {
  const student = await User.findById(req.user._id).select('-password');
  return res.json(student);
};
