import mongoose from 'mongoose';

export const connectDB = async () => {
	await mongoose
		.connect(
			'mongodb+srv://luaygitaris:user123@cluster0.3cyau.mongodb.net/FusionMartYT'
		)
		.then(() => console.log('DB Connected'));
};
