import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

// Login User
const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.json({ success: false, message: "User does's nor exist" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.json({ success: false, message: 'Invalid credentials' });
		}

		const token = createToket(user._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Error' });
	}
};

const createToket = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register User
const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		const exists = await userModel.findOne({ email });
		if (exists) {
			return res.json({ success: false, message: 'User already exists' });
		}

		if (!validator.isEmail(email)) {
			return res.json({
				success: false,
				message: 'Please enter a valid email!',
			});
		}
		if (password.length < 8) {
			return res.json({
				success: false,
				message: 'Please enter a strong password!',
			});
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name: name,
			email: email,
			password: hashedPassword,
		});

		const user = await newUser.save();
		const token = createToket(user._id);
		res.json({ success: true, token });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: 'Error' });
	}
};

export { loginUser, registerUser };
