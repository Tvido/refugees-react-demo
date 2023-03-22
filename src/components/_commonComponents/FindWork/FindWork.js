import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import IconInputWrapper from '../IconInputWrapper/IconInputWrapper';
import Button from '../Button/Button';

const FindWork = ({ vacanciesList, filterOptions=null, findWorkResponse }) => {
	const [input, setInput] = useState({
		position: '',
		place: ''
	});
	
	// Filter component data
	const filterSalary = useSelector(state => state.filterSalary);
	const filterActivity = useSelector(state => state.filterActivity);
	const dispatch = useDispatch();

	console.log(vacanciesList)
	
	// Get data and save using 'name' for recognizing
	const changeHandler = e => {		
		const { name, value } = e.target;
		
		setInput(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	const submitClick = () => {
		if (!vacanciesList) {
			findWorkResponse([]);
			return;
		}
		
		// - Finding out according on 'position' and 'place'
		const { position, place } = input;		
		const res = vacanciesList.filter(item => {
			return (position.toLowerCase() === item.position.toLowerCase() && place.toLowerCase() === item.place.toLowerCase())
		});

		// - Finding out according on filter component`s data
		const finalRes = filterSearch(res);
		
		findWorkResponse(finalRes);
	};
	
	function filterSearch(vacanciesRes) {
		let finalRes = [];
		
		if (filterSalary && filterSalary != 'any') {
			const resSalary = vacanciesRes.filter(({ salaryMax, type }) => {
				
				if (salaryMax >= +filterSalary) {
					// console.log('----------------', filterActivity.parttime && type === 'part time');
					const one = (filterActivity.fulltime && type === 'full time');
					const two = (filterActivity.parttime && type === 'part time');
					
					return one || two;
				}
			});
			
			finalRes = finalRes.concat(resSalary);
		} else {
			finalRes = finalRes.concat(vacanciesRes);
		}
		
		return finalRes;
	}
	
	return (
		<div className="find-work">
			<IconInputWrapper
				src={'search.png'}
				name='position'
				placeholder={'Ким ви хочете працювати?'}
				onChange={changeHandler}
			/>
			
			<IconInputWrapper
				src={'marker.png'}
				name='place'
				placeholder={'Місто'}
				onChange={changeHandler}
			/>
			
			<Button 
				text='Пошук'
				clickHandler={() => submitClick(input)}
			/>
		</div>
	);
}

export default FindWork;