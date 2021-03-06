import { useStateContext } from '../../Context';
import { CartItemCard } from './CartItemCard';
import { CartValueDetails } from './CartValue';
import { SelectAddress } from './SelectAddress';

export const Cart = () => {
	const { state } = useStateContext();

	return (
		<>
			<h1 className='text-center h6 page-title'>My Cart</h1>

			{!state?.itemsInCart?.products?.length ? (
				<h3 className='text-center'>Cart is empty</h3>
			) : (
				<>
					<div className='display-flex width-800px'>
						<ul className='column-60-pc list-style-none styled-list padding-1rem-borderbox'>
							<SelectAddress />
							{state.itemsInCart.products.map(
								({ productId: product, quantity }) => {
									return (
										<li key={product._id}>
											<CartItemCard
												key={product._id}
												product={{ ...product, quantity }}
											/>
										</li>
									);
								},
							)}
						</ul>
						<CartValueDetails />
					</div>
				</>
			)}
		</>
	);
};
