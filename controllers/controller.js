import Questions from '../models/question.js';
import Results from '../models/result.js';

/** Questions API */
export async function getQuestions(req, res) {
  try {
    const q = await Questions.find();
    res.json(q);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function insertQuestions(req, res) {
  try {
    const questions = req.body;
    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty question data' });
    }
    await Questions.insertMany(questions);
    res.json({ msg: 'Questions Saved Successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function dropQuestions(req, res) {
  try {
    await Questions.deleteMany();
    res.json({ msg: 'Questions Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** Results API */
export async function getResult(req, res) {
  try {
    const username = req.query.username;

    if (!username) {
      return res.status(400).json({ error: 'Username query param is required' });
    }

    const result = await Results.findOne({ username });

    if (!result) {
      return res.status(404).json({ error: 'Result not found for user' });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching result' });
  }
}


export async function storeResult(req, res) {
  try {
    const { username, result, attempts, points, achieved } = req.body;
    if (!username || !Array.isArray(result)) {
      return res.status(400).json({ error: 'Missing username or result' });
    }
    await Results.create({ username, result, attempts, points, achieved });
    res.json({ msg: 'Result Saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function dropResult(req, res) {
  try {
    const { username } = req.query;

    if (username) {
      const result = await Results.deleteOne({ username });

      if (result.deletedCount === 0) {
        return res.status(404).json({ msg: 'No result found for this username' });
      }

      return res.json({ msg: `Result for '${username}' deleted` });
    }

    // If no username provided, delete all
    await Results.deleteMany();
    res.json({ msg: 'All results deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
