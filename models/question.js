import mongoose from 'mongoose';

const questionModel = new mongoose.Schema({
  question: String,
  options: [String],
  answer: Number
});
export default mongoose.model('Question', questionModel);