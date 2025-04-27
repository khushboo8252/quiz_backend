import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { config } from 'dotenv';
import router from './router/route.js';
import connect from './database/conn.js';

const app = express();
config();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (req, res) => {
  res.json('Welcome to the Quiz API');
});

connect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
  });
});