// import mongoose from 'mongoose';

// export const connectDB = async () => {
// 	await mongoose
// 		.connect(
// 			'mongodb+srv://luaygitaris:user123@cluster0.3cyau.mongodb.net/FusionMartYT'
// 		)
// 		.then(() => console.log('DB Connected'));
// };

import mongoose from 'mongoose';

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB error:', err));
