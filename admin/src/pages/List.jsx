import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {TbTrash} from 'react-icons/tb'

const List = ({url}) => {
	const [list, setList] = useState([]);

	const fetchList = async () => {
		const response = await axios.get(`${url}/api/product/list`);
		console.log(response.data);

		if (response.data.succes) {
			setList(response.data.data);
		} else {
			toast.error('Error');
		}
	};

	const removeProduct = async (productId) => {
		const response = await axios.post(`${url}/api/product/remove`, {id:productId})
		await fetchList()
		if (response.data.succes) {
			toast.success(response.data.message)
		} else {
			toast.error("error")
		}
	}

	useEffect(() => {
		fetchList();
	});

	return (
		<section className='p-4 sm:p-10 box-border w-4/5'>
			<h4 className='bold-22 uppercase'>Products List</h4>
			<div className='overflow-auto mt-5'>
				<table className='w-full'>
					<thead>
						<tr className='border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-15 text-start py-12'>
							<th className='p-1 text-left'>Products</th>
							<th className='p-1 text-left'>Title</th>
							<th className='p-1 text-left'>Price</th>
							<th className='p-1 text-left'>Remove</th>
						</tr>
					</thead>
					<tbody>
						{list.map((product) => (
							<tr key={product._id} className='border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left'>
								<td className='p-1'>
									<img
										src={product.image}
										alt='productImg'
										height={38}
										width={38}
										className='rounded-lg ring-1 ring-slate-900/5 m-1'
									/>
								</td>
								<td className='p-1'>
									<div className='line-clamp-3'>{product.name}</div>
								</td>
								<td className='p-1'>${product.price}</td>
								<td className='p-1'>
									<div className='bold-22'>
										<TbTrash onClick={()=>removeProduct(product._id)}/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
};

export default List;
