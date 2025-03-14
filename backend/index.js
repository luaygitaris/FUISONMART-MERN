import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Database connection
mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.error('Database connection error:', error));

// Default route
app.get('/', (req, res) => {
    res.send('API Working');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`));