import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Header from '../../Header/Header';
import Button from '../../_commonComponents/Button/Button';
import InputWrapper from '../../_commonComponents/InputWrapper/InputWrapper';
import TextareaWrapper from '../../_commonComponents/TextareaWrapper/TextareaWrapper';

import { 
	get,
	deleteMethod
} from '../../../services';

const JobInfo = () => {	
	const data = {
		eployeerName: '',
		number: '',
		position: '',
		salarMax: '',
		type: '',
		place: '',
		description: ''
	};
	
	const [jobInfo, setJobInfo] = useState({...data});
	const [isCreated, setIsCreated] = useState(false);
	
	const token = useSelector(state => state.token);
	const dispatch = useDispatch();
	
	useEffect(() => {
		const request = {
			urlPoint: '/vacancies',
			token
		};
		
		get(request, ({ isSuccess, data }) => {
			if (!token) {
				alert('Вам потрібно спочатку увійти в програму');
				return;
			}
			
			if (isSuccess) {				
				const vacancies = data.vacancies;
				let len = vacancies.length;
								
				if (len > 0) {
					setIsCreated(true);
					setJobInfo(vacancies[len - 1]);
					dispatch({
						type: 'setVacancies',
						value: vacancies[len - 1]
					});
				}
			} else {
				alert(`Can't load data. ${data.response.data.message}`);
			}
		});
	}, []);
	
	return (
		<section className="job-info">
			<Header />
		
			<main className="job-info__main main">
				{	!isCreated
						&&
						<h2 className="main__title">Empty</h2>
					}
					
				{	isCreated
					&&
					<>
					
						<div className="main__block block">
							<p className="block__position">{jobInfo.position}</p>
							
							<p className="block__salary">{jobInfo.salaryMax} грн.</p>
							
							<p className="block__type">{jobInfo.type}</p>
							
							<p className="block__employer">{jobInfo.eployeerName}</p>
						</div>
						
						<div className="hr" />
						<div className="main__block block">
							<p className="block__location">Розташування: {jobInfo.place}</p>
							
							<p className="block__phone">Телефон: {jobInfo.number}</p>
						</div>
						<div className="hr" />
						
						<div className="main__block block others">
							<span className="bold">Примітка: </span>
							<span>{jobInfo.description}</span>
						</div>
						
						<div className="main__button-wrapper">
							<div className="main__button">
								<Link
									to={'/'}
									className="button"
								>
									OK
								</Link>
							</div>
						</div>
					</>
				}
			</main>
		</section>
	);
}

export default JobInfo;