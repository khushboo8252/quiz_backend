import mongoose from 'mongoose';

const resultModel = new mongoose.Schema({
  username: String,
  result: [Number],
  attempts: Number,
  points: Number,
  achieved: String
});

export default mongoose.model('Result', resultModel);