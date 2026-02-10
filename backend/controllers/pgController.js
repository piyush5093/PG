import PG from '../models/PG.js';
import Review from '../models/Review.js';

export const createPG = async (req, res) => {
  const pg = await PG.create({ ...req.body, owner: req.user._id });
  res.status(201).json(pg);
};

export const updatePG = async (req, res) => {
  const pg = await PG.findById(req.params.id);
  if (!pg) return res.status(404).json({ message: 'PG not found' });
  if (String(pg.owner) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Not allowed to edit this PG' });
  }

  Object.assign(pg, req.body);
  const updated = await pg.save();
  res.json(updated);
};

export const deletePG = async (req, res) => {
  const pg = await PG.findById(req.params.id);
  if (!pg) return res.status(404).json({ message: 'PG not found' });
  if (String(pg.owner) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Not allowed to delete this PG' });
  }

  await Review.deleteMany({ pg: pg._id });
  await pg.deleteOne();
  res.json({ message: 'PG deleted' });
};

export const getOwnerPGs = async (req, res) => {
  const pgs = await PG.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(pgs);
};

export const getPGs = async (req, res) => {
  const { location, maxRent, facility, search } = req.query;
  const query = {};

  if (location) query.location = { $regex: location, $options: 'i' };
  if (maxRent) query.rent = { $lte: Number(maxRent) };
  if (facility) query.facilities = { $in: [facility] };
  if (search) query.title = { $regex: search, $options: 'i' };

  const pgs = await PG.find(query).populate('owner', 'name email').sort({ createdAt: -1 });
  res.json(pgs);
};

export const getPGById = async (req, res) => {
  const pg = await PG.findById(req.params.id).populate('owner', 'name email');
  if (!pg) return res.status(404).json({ message: 'PG not found' });

  const reviews = await Review.find({ pg: pg._id }).populate('student', 'name');
  res.json({ ...pg.toObject(), reviews });
};
