import { useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
	const [data, setData] = useState({
		name: '',
		description: '',
		price: '',
		image: '',
		category: 'Men',
	});
	const [imagePreview, setImagePreview] = useState(null);

	const onChangeHandler = (event) => {
		const { name, value } = event.target;

		if (name === 'image') {
			setData((prevData) => ({ ...prevData, [name]: value }));
			setImagePreview(value || null);
		} else {
			setData((prevData) => ({ ...prevData, [name]: value }));
		}
	};

	const onSubmitHandler = async (event) => {
		event.preventDefault();

		// Validasi sederhana di sisi client
		if (!data.name || !data.price || !data.image || !data.category || !data.description) {
			toast.error('Harap isi semua field yang diperlukan.');
			return;
		}

		try {
			const response = await axios.post(`${url}/api/product/add`, {
				name: data.name,
				description: data.description,
				price: Number(data.price),
				image: data.image,
				category: data.category,
			});

			if (response.data.success) {
				setData({
					name: '',
					description: '',
					price: '',
					image: '',
					category: 'Men',
				});
				setImagePreview(null);
				toast.success(response.data.message);
			}
		} catch (error) {
			console.error('Error submitting data:', error);
			toast.error('Terjadi kesalahan saat menambahkan produk.');
		}
	};

	return (
		<section className='p-4 sm:p-10 w-4/5 bg-primary/20'>
			<form onSubmit={onSubmitHandler} className='flex flex-col gap-y-5 max-w-[555px]'>
				<h4 className='bold-22 pb-2 uppercase'>Products Upload</h4>

				{/* Bagian Preview Gambar */}
				<div className='flex justify-center mb-4'>
					{imagePreview && (
						<img
							src={imagePreview}
							alt='Preview'
							className='h-32 w-32 object-cover rounded-md'
						/>
					)}
				</div>

				<div className='flex flex-col gap-y-2 h-24'>
					<p>Product Name</p>
					<input
						type='text'
						placeholder='Type here...'
						className='ring-1 ring-slate-900/10 py-1 px-3 outline-none'
						onChange={onChangeHandler}
						value={data.name}
						name='name'
						required
					/>
				</div>
				<div className='flex flex-col gap-y-2'>
					<p>Upload Image (URL)</p>
					<input
						type='text'
						placeholder='Image URL'
						className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none'
						onChange={onChangeHandler}
						value={data.image}
						name='image'
						required
					/>
				</div>
				<div className='flex flex-col gap-y-2'>
					<p>Product Description</p>
					<textarea
						id='description'
						placeholder='Write content here...'
						rows={6}
						required
						className='ring-1 ring-slate-900/10 py-1 px-3 outline-none resize-none'
						onChange={onChangeHandler}
						value={data.description}
						name='description'
					></textarea>
				</div>
				<div className='flex items-center gap-x-6 text-gray-900/70 medium-15'>
					<div className='flex flex-col gap-y-2'>
						<p>Product Category</p>
						<select
							className='outline-none ring1 ring-slate-900/10 pl-2'
							onChange={onChangeHandler}
							value={data.category}
							name='category'
							required
						>
							<option value='Men'>Men</option>
							<option value='Women'>Women</option>
							<option value='Kids'>Kids</option>
							<option value='Electronics'>Electronics</option>
							<option value='Cosmetics'>Cosmetics</option>
						</select>
					</div>
					<div className='flex flex-col gap-y-2'>
						<p>Product Price</p>
						<input
							type='number'
							placeholder='$20'
							className='ring-1 ring-slate-900/10 pl-2 outline-none'
							onChange={onChangeHandler}
							value={data.price}
							name='price'
							required
						/>
					</div>
				</div>
				<button type='submit' className='btn-dark sm:w-5/12 flexCenter gap-x-2 !py-2 rounded'>
					<FaPlus />
					Add Product
				</button>
			</form>
		</section>
	);
};

export default Add;