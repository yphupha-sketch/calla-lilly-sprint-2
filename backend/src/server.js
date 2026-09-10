import express from 'express';
import connectDB from './config/db.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Calla Lilly API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}😀`);
});