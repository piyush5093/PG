import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ['student', 'owner'], required: true },
    profile: {
      age: Number,
      gender: String,
      budget: Number,
      sleepTime: { type: String, enum: ['early', 'late'] },
      studyHabits: String,
      smoking: { type: Boolean, default: false },
      drinking: { type: Boolean, default: false },
      cleanlinessLevel: { type: Number, min: 1, max: 5 },
      preferredLocation: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function matchPassword(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
