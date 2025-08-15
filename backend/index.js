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
    origin: "https://fuisonmart-mern-frontend.vercel.app/", // Atur origin yang diizinkan
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Atur metode HTTP yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization', 'token'], // tambahkan 'token'
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

// Error handler agar error backend tampil jelas di console dan response
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Server running on ${PORT} PORT`));
