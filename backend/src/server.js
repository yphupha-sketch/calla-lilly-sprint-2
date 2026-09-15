import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import productsRoute from './routes/productsRoute.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productsRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Calla Lilly API is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}😀`);
});