import productModel from '../models/productModel.js';
import fs from 'fs';

const addProduct = async (req, res) => {
	// let image_filename = `${req.file.filename}`;

	const product = new productModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image: req.body.image,
	});
	try {
		await product.save();
		res.json({ succes: true, message: 'Product Added' });
	} catch (error) {
		console.log(error);
		res.json({ succes: false, message: 'Error' });
	}
};

const listProduct = async (req, res) => {
	try {
		const products = await productModel.find({});
		res.json({ succes: true, data: products });
	} catch (error) {
		console.log(error);
		res.json({ succes: false, message: 'Error' });
	}
};

const removeProduct = async (req, res) => {
	try {
		const product = await productModel.findById(req.body.id);
		// fs.unlink(`uploads/${product.image}`, ()=>{})

		await productModel.findByIdAndDelete(req.body.id);
		res.json({ succes: true, message: 'Product Removed' });
	} catch (error) {
		console.log(error);
		res.json({ succes: false, message: 'Error' });
	}
};

export { addProduct, listProduct, removeProduct };
