import 'dotenv/config.js';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/productRoute.js';
import userRouter from './routes/userRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const port = 4000;

app.use(express.json());
app.use(cors());

connectDB();
app.use('/api/product', productRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
	res.send('API Working');
});

export default (req, res) => {
	app(req, res);
};

app.listen(port, () => {
	console.log(`Server started on http://localhost:${port}`);
});
