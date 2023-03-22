import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Checkbox from '../Checkbox/Checkbox';

const JobFilter = () => {
	const [salary, setSalary] = useState(false);	
	const activityName = {
		fulltime: 'Повний робочий день',
		parttime: 'Тимчасова зайнятість'
	}
	const [activity, setActivity] = useState({
		fulltime: false,
		parttime: false
	});
	
	const filter = useSelector(state => state.filter);
	const dispatch = useDispatch();
	
	const handleCheckboxSalary = e => {
		const { type, name, value, checked } = e.target;
		setSalary(value);		
	};
	
	const handleCheckboxActivity = e => {
		const { type, name, value, checked } = e.target;
		setActivity(prev => ({
			...prev,
			[value]: checked
		}));
	};
	
	useEffect(() => {
		dispatch({ type: 'setFilterSalary', value: salary });
	}, [salary]);
	
	useEffect(() => {
		dispatch({ type: 'setFilterAction', value: activity });
	}, [activity]);
		
	const activityList = Object.entries(activity).map((item, index) => {
		const key = item[0];
		const { isChecked } = item[1];
		const name = activityName[key];
		
		return (
			<label
				key={index}
			>
				<Checkbox
					type={'checkbox'}
					name={'activity'}
					value={key}
					checked={isChecked}
					onChange={handleCheckboxActivity}
				/>
				{name}
			</label>
		)
	});
		
	return (
		<section className="job-filter">
			<p className="job-filter__title">Фільтри</p>
			
			<div className="job-filter__block">
				<p className="job-filter__block-title">Зарплата:</p>
				
				<label>
					<Checkbox
						type={'radio'}
						name={'salary'}
						value={'any'}
						onChange={handleCheckboxSalary}
					/>
					Будь-яка
				</label>
				<label>
					<Checkbox
						type={'radio'}
						name={'salary'}
						value={'4500'}
						onChange={handleCheckboxSalary}
					/>
					Від 4500
				</label>
				<label>
					<Checkbox
						type={'radio'}
						name={'salary'}
						value={'7500'}
						onChange={handleCheckboxSalary}
					/>
					Від 7500
				</label>	
				<label>
					<Checkbox
						type={'radio'}
						name={'salary'}
						value={'16000'}
						onChange={handleCheckboxSalary}
					/>
					Від 16000
				</label>
			</div>
			
			<div className="job-filter__block">
				<p className="job-filter__block-title">Тип зайнятості:</p>
				
				{activityList}
			</div>
		</section>
	);
}

export default JobFilter;