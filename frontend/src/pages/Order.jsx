import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const Order = () => {
	const navigate = useNavigate();
	const { getTotalCartAmount, token, all_products, cartItems, url, userId } =
		useContext(ShopContext);
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		street: '',
		city: '',
		state: '',
		zipcode: '',
		country: '',
		phone: '',
	});

	const onChangeHandler = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setData((data) => ({ ...data, [name]: value }));
		
	};

	const placeOrder = async (e) => {
		e.preventDefault();
		let orderItems = [];
		all_products.map((item) => {
			if (cartItems[item._id] > 0) {
				let itemInfo = item;
				itemInfo['quantity'] = cartItems[item._id];
				orderItems.push(itemInfo);
			}
		});
		let orderData = {
			userId, // tambahkan userId
			address: data,
			items: orderItems,
			amount: getTotalCartAmount() + 2,
		};
		let response = await axios.post(`${url}/api/order/place`, orderData, {
			headers: { token },
		});

		if (response.data.success) {
			const { session_url } = response.data;
			
			window.location.replace(session_url);
		} else {
			alert('Error');
		}
	};

	useEffect(() => {
		if (!token) {
			navigate('/cart');
		} else if (getTotalCartAmount() === 0) {
			navigate('/cart');
		}
	},[token]);
	return (
		<section className='max-padd-container py-28 xl:py-32'>
			<form
				onSubmit={placeOrder}
				className='flex flex-col xl:flex-row gap-20 xl:gap-28'
			>
				<div className='flex flex-1 flex-col gap-3 text-[95%]'>
					<h3 className='bold-28 mb-4'>Delivery Information</h3>
					<div className='flex gap-3'>
						<input
							onChange={onChangeHandler}
							value={data.firstName}
							type='text'
							name='firstName'
							placeholder='First Name'
							className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2'
							required
						/>
						<input
							onChange={onChangeHandler}
							value={data.lastName}
							type='text'
							name='lastName'
							placeholder='Last Name'
							className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2'
							required
						/>
					</div>
					<input
						onChange={onChangeHandler}
						value={data.email}
						type='email'
						name='email'
						placeholder='Email'
						className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none'
						required
					/>
					<input
						onChange={onChangeHandler}
						value={data.phone}
						type='text'
						name='phone'
						placeholder='Phone Number'
						className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none'
						required
					/>
					<input
						onChange={onChangeHandler}
						value={data.street}
						type='text'
						name='street'
						placeholder='Street'
						className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none'
						required
					/>
					<div className='flex gap-3'>
						<input
							onChange={onChangeHandler}
							value={data.city}
							type='text'
							name='city'
							placeholder='City'
							className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2'
							required
						/>
						<input
							onChange={onChangeHandler}
							value={data.state}
							type='text'
							name='state'
							placeholder='State'
							className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2'
							required
						/>
					</div>
					<div className='flex gap-3'>
						<input
							onChange={onChangeHandler}
							value={data.zipcode}
							type='text'
							name='zipcode'
							placeholder='Zip Code'
							className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2'
							required
						/>
						<input
							onChange={onChangeHandler}
							value={data.country}
							type='text'
							name='country'
							placeholder='Country'
							className='ring-1 ring-slate-900/15 p-1 pl-3 rounded-sm outline-none w-1/2'
							required
						/>
					</div>
				</div>
				<div className='flex flex-1 flex-col'>
					<div className='flex flex-1 flex-col gap-2'>
						<h4 className='bold-22'>Summary</h4>
						<div>
							<div className='flexBetween py-3'>
								<h4 className='medium-16'>Subtotal:</h4>
								<h4 className='text-gray-30 font-semibold'>
									${getTotalCartAmount()}
								</h4>
							</div>
							<hr className='h-[2px] bg-slate-900/15' />
							<div className='flexBetween py-3'>
								<h4 className='medium-18'>Shipping Fee:</h4>
								<h4 className='text-gray-30 font-semibold'>
									${getTotalCartAmount() === 0 ? 0 : 2}
								</h4>
							</div>
							<hr className='h-[2px] bg-slate-900/15' />
							<div className='flexBetween py-3'>
								<h4 className='medium-18'>Total:</h4>
								<h4 className='text-gray-30 font-semibold'>
									${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() * 2}
								</h4>
							</div>
							<button className='btn-secondary w-52 rounded'>
								Proceed to Checkout
							</button>
						</div>
					</div>
				</div>
			</form>
		</section>
	);
};

export default Order;
