import { useStateContext } from '../../Context';
import { getSortedData, getFilteredData, Filter } from './DataFilter';
import { ProductCard } from './ProductCard';
import './styles.css';

export const ProductListing = () => {
	const { state } = useStateContext();
	const sortedData = getSortedData(state, state.products);
	const filterdData = getFilteredData(state, sortedData);  //pass sortedData or state.products

	return (
		<>
			<h1 className='text-center h6 page-title'>
				Accessories for Sketching{' '}
				<span className='text-light-weight'> - {filterdData.length} items</span>
			</h1>
			<div className='display-flex-filter'>
				<div className='grid-left-filter'>
					<Filter />
				</div>
				<div className='grid-4-column-layout grid-right-of-filter padding-around-1rem'>
					{filterdData.length !== 0 &&
						filterdData.map((product) => {
							return <ProductCard key={product._id} product={product} />;
						})}
				</div>
			</div>
		</>
	);
};
