import { useEffect, useRef } from 'react';

import { useAuthentication, useStateContext } from '../../Context';
import {
	increaseQtyOfProductInCart,
	decreaseQtyOfProductInCart,
	removeProductFromCart,
} from '../../utils';

export const CartActionButtons = ({
	product,
	setMessage,
	disableButtonWhileProcessing,
	setDisableButton,
}) => {
	let isRendered = useRef(false);
	const {
		state: { token },
	} = useAuthentication();

	useEffect(() => {
		isRendered.current = true;
		return () => {
			isRendered.current = false;
		};
	}, []);

	const { dispatch } = useStateContext();

	return (
		<>
			<button
				className={
					disableButtonWhileProcessing
						? 'btn btn-icon-secondary border-1px-square btn-disabled'
						: 'btn btn-icon-secondary border-1px-square'
				}
				onClick={() =>
					product.quantity !== 1
						? decreaseQtyOfProductInCart({
								setMessage,
								setDisableButton,
								dispatch,
								product,
								isRendered,
								token,
						  })
						: removeProductFromCart({
								setMessage,
								setDisableButton,
								dispatch,
								product,
								isRendered,
								token,
						  })
				}
				disabled={disableButtonWhileProcessing}>
				<span className='btn-icon'>
					<i
						className={
							product.quantity !== 1 ? 'fas fa-minus' : 'fas fa-trash-alt'
						}></i>
				</span>
			</button>
			<span className='border-1px-square cart-qty-style'>
				{product.quantity}
			</span>

			<button
				className={
					disableButtonWhileProcessing
						? 'btn btn-icon-secondary border-1px-square btn-disabled'
						: 'btn btn-icon-secondary border-1px-square'
				}
				disabled={disableButtonWhileProcessing}
				onClick={() =>
					increaseQtyOfProductInCart({
						setMessage,
						setDisableButton,
						dispatch,
						product,
						isRendered,
						token,
					})
				}>
				<span className='btn-icon'>
					<i className='fas fa-plus'></i>
				</span>
			</button>
		</>
	);
};
