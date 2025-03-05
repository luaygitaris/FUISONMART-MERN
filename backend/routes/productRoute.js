import express from 'express';
import {
	addProduct,
	listProduct,
	removeProduct,
} from '../controllers/productController.js';


const productRouter = express.Router();


productRouter.post('/add', addProduct);
productRouter.get('/list', listProduct);
productRouter.post('/remove', removeProduct);

export default productRouter;
