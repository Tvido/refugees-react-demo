import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Checkbox from '../../_commonComponents/Checkbox/Checkbox';

const JobFilter = () => {	
	const activityName = {
		fulltime: 'Повний робочий день',
		parttime: 'Тимчасова зайнятість'
	}
	
	const [activity, setActivity] = useState('fulltime');
	
	const dispatch = useDispatch();
	
	const handleCheckbox = e => {
		const { type, name, value, checked } = e.target;
		setActivity(value);		
	};
	
	useEffect(() => {
		dispatch({ type: 'setCreateJobFilterActivity', value: activity });
	}, [activity]);
		
	return (
		<section className="job-filter">
			<div className="job-filter__block">
				<p className="job-filter__block-title">Тип зайнятості:</p>
				
				<label>
					<Checkbox
						type={'radio'}
						name={'activity'}
						value={'fulltime'}
						onChange={handleCheckbox}
					/>
					{activityName['fulltime']}
				</label>
				<label>
					<Checkbox
						type={'radio'}
						name={'activity'}
						value={'parttime'}
						onChange={handleCheckbox}
					/>
					{activityName['parttime']}
				</label>
			</div>
		</section>
	);
}

export default JobFilter;