import axios from 'axios';
import { isAlreadyAdded } from './array-update-functions';
import { API_URL } from './constants';

export const getProductsFromServer = async (dispatch) => {
	try {
		const {
			data: { response },
			status,
		} = await axios({ method: 'GET', url: `${API_URL}/products` });

		if (status === 200 || status === 201) {
			dispatch({ type: 'SET_PRODUCTS', payload: response });
		} else {
			throw new Error('Failed to get products');
		}
	} catch (error) {
		console.log(error);
	}
};

export const getCartFromServer = async (dispatch, token) => {
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'GET',
			url: `${API_URL}/cart`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (status === 200 || status === 201) {
			dispatch({ type: 'SET_CART', payload: response });
		} else {
			throw new Error('Failed to get cart');
		}
	} catch (error) {
		console.log(error);
	}
};

export const getWishlistFromServer = async (dispatch, token) => {
	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'GET',
			url: `${API_URL}/wishlist`,
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (status === 200 || status === 201) {
			dispatch({ type: 'SET_WISHLIST', payload: response });
		} else {
			throw new Error('Failed to get products');
		}
	} catch (error) {
		console.log(error);
	}
};

export const addProductToWishlist = async ({
	state,
	dispatch,
	setMessage,
	setDisableButton,
	product,
	isRendered,
	token,
}) => {
	!isAlreadyAdded(state.itemsInWishlist, product._id)
		? setMessage({ msg: 'adding to wishlist..', msgType: 'toast-inform' })
		: setMessage({
				msg: 'removing from wishlist..',
				msgType: 'toast-inform',
		  });
	setDisableButton(true);

	try {
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${API_URL}/wishlist`,
			data: {
				_id: product._id,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (status === 200 || status === 201) {
			dispatch({
				type: 'SET_WISHLIST',
				payload: response,
			});
		}
	} catch (error) {
		console.error(error);
		if (isRendered.current) {
			setMessage({
				msg: 'failed!',
				msgType: 'toast-error',
			});
		}
	} finally {
		if (isRendered.current) {
			setDisableButton(false);
		}
	}
};

export const addProductToCart = async ({
	setMessage,
	setDisableButton,
	dispatch,
	product,
	isRendered,
	token,
}) => {
	setMessage({ msg: 'adding to cart..', msgType: 'toast-inform' });

	try {
		setDisableButton(true);
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${API_URL}/cart`,
			data: {
				_id: product._id,
				quantity: 1,
				active: true,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (status === 200 || status === 201) {
			dispatch({
				type: 'SET_CART',
				payload: response,
			});
			if (isRendered.current) {
				setMessage({ msg: 'added!', msgType: 'toast-success' });
			}
		}
	} catch (error) {
		console.error(error);
		if (isRendered.current) {
			setMessage({ msg: 'failed to add', msgType: 'toast-error' });
		}
	} finally {
		if (isRendered.current) {
			setDisableButton(false);
		}
	}
};

export const increaseQtyOfProductInCart = async ({
	setMessage,
	setDisableButton,
	dispatch,
	product,
	isRendered,
	token,
}) => {
	setMessage({ msg: 'updating..', msgType: 'toast-inform' });

	try {
		setDisableButton(true);
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${API_URL}/cart`,
			data: {
				_id: product._id,
				quantity: product.quantity + 1,
				active: true,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (status === 200 || status === 201) {
			dispatch({
				type: 'SET_CART',
				payload: response,
			});
			if (isRendered.current) {
				setMessage({ msg: 'added!', msgType: 'toast-success' });
			}
		}
	} catch (error) {
		console.error(error);
		if (isRendered.current) {
			setMessage({ msg: 'failed to add', msgType: 'toast-error' });
		}
	} finally {
		if (isRendered.current) {
			setDisableButton(false);
		}
	}
};

export const decreaseQtyOfProductInCart = async ({
	setMessage,
	setDisableButton,
	dispatch,
	product,
	isRendered,
	token,
}) => {
	setMessage({ msg: 'updating..', msgType: 'toast-inform' });

	try {
		setDisableButton(true);
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${API_URL}/cart`,
			data: {
				_id: product._id,
				quantity: product.quantity - 1,
				active: true,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (status === 200 || status === 201) {
			dispatch({
				type: 'SET_CART',
				payload: response,
			});
			if (isRendered.current) {
				setMessage({ msg: 'added!', msgType: 'toast-success' });
			}
		}
	} catch (error) {
		console.error(error);
		if (isRendered.current) {
			setMessage({ msg: 'failed to add', msgType: 'toast-error' });
		}
	} finally {
		if (isRendered.current) {
			setDisableButton(false);
		}
	}
};

export const removeProductFromCart = async ({
	setMessage,
	setDisableButton,
	dispatch,
	product,
	isRendered,
	token,
}) => {
	setMessage({ msg: 'updating..', msgType: 'toast-inform' });

	try {
		setDisableButton(true);
		const {
			data: { response },
			status,
		} = await axios({
			method: 'POST',
			url: `${API_URL}/cart`,
			data: {
				_id: product._id,
				quantity: 0,
				active: false,
			},
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
		if (status === 200 || status === 201) {
			dispatch({
				type: 'SET_CART',
				payload: response,
			});
			if (isRendered.current) {
				setMessage({ msg: 'added!', msgType: 'toast-success' });
			}
		}
	} catch (error) {
		console.error(error);
		if (isRendered.current) {
			setMessage({ msg: 'failed to add', msgType: 'toast-error' });
		}
	} finally {
		if (isRendered.current) {
			setDisableButton(false);
		}
	}
};
