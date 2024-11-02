import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import categoriesRouter from './routes/categories.js';
import productsRouter from './routes/products.js';
import authRouter from './routes/auth.js';
dotenv.config();
const app = express();
app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);
mongoose.connect(process.env.MONGODB_URI, ).then(() => {
  console.log('Connected to MongoDB');
  const PORT = process.env.PORT ;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

}).catch((err) => {
  console.error('Error connecting to MongoDB', err);
});