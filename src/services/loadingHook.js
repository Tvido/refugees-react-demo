import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
	instance
} from './index';

function useRequest({ url, type, method='GET', dataKey }) {
	const [isLoading, setIsLoading] = useState(true);
	const dispatch = useDispatch();
		
	useEffect(() => {
		const loadData = async() => {
			try {
				const response = await instance({
					url,
					method
				});
				
				// dispatch({ 
					// type,
					// value: response.data[dataKey]
				// });
			} catch(e) {				
				// dispatch({ 
					// type,
					// value: null
				// });
			} finally {
				setIsLoading(false);
			}
		}
		
		loadData();
	}, []);
	
	return {isLoading};
}

export default useRequest;