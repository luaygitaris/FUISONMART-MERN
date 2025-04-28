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

// Menggunakan CORS umum untuk semua origin
const corsOptions = {
    origin: '*', // Mengizinkan semua origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Atur metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Atur headers yang diizinkan
};

app.use(cors(corsOptions));

app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log('Database is connected'))
    .catch((error) => console.error('Database connection error:', error));

app.get('/', (req, res) => {
    res.send('API Working');
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`));
