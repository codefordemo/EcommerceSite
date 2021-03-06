import { useEffect, useState } from 'react';

import { coupons } from '../../database';
import { useStateContext } from '../../Context';
import './cart.css';

const indianRupeeSymbol = `\u20B9`;

export const CartValueDetails = () => {
	const { state } = useStateContext();
	const [userSelectedCoupon, setCoupon] = useState({
		couponName: '',
		couponPrice: 0,
		minOrderValue: '',
	});
	const [showOfferModal, setOfferModal] = useState(false);

	const cartDetailsCalculator = (data) =>
		data.reduce(
			(sum, { productId: { price, offer }, quantity }) => {
				return {
					totalMRP: sum.totalMRP + Number(price) * Number(quantity),
					discount:
						sum.discount +
						(Number(price) * Number(quantity) * Number(offer)) / 100,
				};
			},
			{ totalMRP: 0, discount: 0 },
		);
	const cartDetails = cartDetailsCalculator(state.itemsInCart.products);
	const cartTotalWithoutOffer = cartDetails.totalMRP - cartDetails.discount;
	const cartTotal =
		cartDetails.totalMRP -
		cartDetails.discount -
		Number(userSelectedCoupon.couponPrice);

	useEffect(() => {
		const checkOffersValid = () => {
			if (cartTotalWithoutOffer <= Number(userSelectedCoupon.minOrderValue)) {
				setCoupon({
					couponName: '',
					couponPrice: 0,
					minOrderValue: '',
				});
			}
		};
		checkOffersValid();
	}, [state.itemsInCart.products]);

	return (
		<>
			<div className='column-40-pc padding-1rem-borderbox border-width-2px-left display-flex-column'>
				<div className='text-regular-weight body-cp-md'>COUPONS</div>

				<button
					onClick={() => setOfferModal(true)}
					style={{ textAlign: 'left' }}
					className='btn btn-text-icon-secondary btn-outline-secondary'>
					<span className='btn-icon'>
						<i className='fas fa-tag'></i>
					</span>
					Apply Coupon
				</button>

				<div className='p text-regular-weight body-cp-md'>
					PRICE DETAILS: ({state.itemsInCart.products.length} items)
				</div>

				<div className='row body-cp-md '>
					<div className='column-80-pc'>Total MRP</div>
					<div className='column-20-pc text-right'>
						{indianRupeeSymbol}
						{cartDetails.totalMRP.toFixed(2)}
					</div>
				</div>
				<div className='row body-cp-md '>
					<div className='column-80-pc'>Discount on MRP</div>
					<div className='column-20-pc text-right text-green'>
						{indianRupeeSymbol}
						{cartDetails.discount.toFixed(2)}
					</div>
				</div>
				{userSelectedCoupon.couponPrice !== 0 && (
					<div className='row body-cp-md '>
						<div className='column-80-pc'>Coupon Discount</div>
						<div className='column-20-pc text-right text-green'>
							{indianRupeeSymbol}
							{userSelectedCoupon.couponPrice}
						</div>
					</div>
				)}
				<div className='row body-cp-md '>
					<div className='column-80-pc'>Convenience Fee</div>
					<span className='text-strike-through'>{indianRupeeSymbol}99</span>
					<span className='text-green'>FREE</span>
					<div className='column-20-pc text-right'></div>
				</div>

				<div className='row body-cp-rg text-regular-weight'>
					<div className='column-80-pc'>Total Amount</div>
					<div className='column-20-pc text-right'>
						{indianRupeeSymbol}
						{cartTotal.toFixed(2)}
					</div>
				</div>
				<button className='btn btn-solid-primary'>Place Order</button>
			</div>

			{/* Modal- for offers */}

			<div
				className={
					showOfferModal ? 'modal-interstitial active' : 'modal-interstitial'
				}>
				<div className='modal-content display-flex-items'>
					<button
						onClick={() => setOfferModal(false)}
						type='button'
						className='btn-close modal-close'></button>
					<div className='text-container'>
						<div className='text-container-title text-center'>
							<h4 className='p'>Apply Coupon</h4>
						</div>
						<div className='text-container-desc'>
							<ul className='stacked-list text-left'>
								{coupons.map(({ coupon, off, minOrder }) => (
									<li
										className={
											Number(cartTotalWithoutOffer) <= Number(minOrder)
												? 'padding-1rem-borderbox greyed-out'
												: 'padding-1rem-borderbox'
										}
										key={coupon}>
										<label className='field-label' htmlFor={coupon}>
											<input
												disabled={
													Number(cartTotalWithoutOffer) <= Number(minOrder)
												}
												id={coupon}
												type='checkbox'
												className='form-checkbox-field'
												name='couponCode'
												value={off}
												checked={coupon === userSelectedCoupon.couponName}
												onChange={(e) => {
													if (!e.target.checked) {
														setCoupon({
															couponName: '',
															couponPrice: 0,
															minOrderValue: '',
														});
													} else {
														setCoupon({
															couponName: coupon,
															couponPrice: off,
															minOrderValue: minOrder,
														});
													}
												}}
											/>

											<span>{coupon}</span>
										</label>
										<div className='body-cp-md'>
											Save {indianRupeeSymbol}
											{off} on minimum purchase of {minOrder}
										</div>
									</li>
								))}
							</ul>
							<div className='text-center'>
								<button
									onClick={() => setOfferModal(false)}
									className='btn btn-outline-primary btn-sm-size'>
									apply
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
