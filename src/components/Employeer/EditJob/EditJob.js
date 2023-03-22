import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../Header/Header';
import InputWrapperEdit from '../../_commonComponents/InputWrapperEdit/InputWrapperEdit';
import TextareaWrapperEdit from '../../_commonComponents/TextareaWrapperEdit/TextareaWrapperEdit';
import CreateJobFilter from '../CreateJob/CreateJobFilter';
import Button from '../../_commonComponents/Button/Button';
import LoadingMessage from '../../_commonComponents/LoadingMessage/LoadingMessage';
import Footer from '../../Footer/Footer';

import { 
	commonValidator,
	salaryValidator,
	errorList
} from '../../../services/validations';

import { 
	get,
	put
} from '../../../services';

const EditJob = () => {
	const data = {
		eployeerName: '',
		number: '',
		position: '',
		place: '',
		type: '',
		salaryMin: '',		
		salaryMax: '',
		description: ''
	};
	
	const [jobInfo, setJobInfo] = useState({...data});
	const [isCreated, setIsCreated] = useState(false);
	const [input, setInput] = useState({...data});
	const [errors, setErrors] = useState(null);
	
	const email = useSelector(state => state.email);
	const token = useSelector(state => state.token);
	const dataVacancies = useSelector(state => state.vacancies);
	const createJobFilterActivity = useSelector(state => state.createJobFilterActivity);
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	
	useEffect(() => {
		if (!dataVacancies) {
			return;
		}
		
		const {
			eployeerName,
			number,
			position,
			place,
			type,
			salaryMin,
			salaryMax,
			description
		} = dataVacancies;
		
		setInput({
			eployeerName,
			number,
			position,
			place,
			type,
			salaryMin,
			salaryMax,
			description
		});
	}, [dataVacancies]);
	
	const changeHandler = e => {		
		const { name, value } = e.target;
		
		setInput(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	const jobFilterHandler = data => {
		console.log(data);
	};
	
	// Submit
	const buttonClickHandler = () => {
		if (!token) {
			alert('Вам потрібно спочатку увійти в програму');
			return;
		}
		
		let isAllCorrect = true;
		setErrors({...data});
		
		if (!commonValidator(input.eployeerName)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				eployeerName: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.number)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				number: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.position)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				position: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.place)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				place: errorList['commonValidator']
			}));
		}
		
		if (!salaryValidator(input.salaryMin)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				salaryMin: errorList['salaryValidator']
			}));
		}
		
		if (!salaryValidator(input.salaryMax)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				salaryMax: errorList['salaryValidator']
			}));
		}
		
		if (!commonValidator(input.description)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				description: errorList['commonValidator']
			}));
		}
		
		if (createJobFilterActivity === "") {
			alert('Тип зайнятості undefined');
			isAllCorrect = false;
		}
		
		if (!isAllCorrect) {
			return;
		}
		
		// - Sending to the server
		const request = {
			urlPoint: '/vacancies',
			props: {
				...input,
				type: createJobFilterActivity === 'fulltime' ? 'full time' : 'part time'
			},
			token
		};
		
		setIsLoading(true);
		
		put(request, ({ isSuccess, data }) => {
			setIsLoading(false);
			
			if (isSuccess) {
				setTimeout(() => {
					alert('Success!');
				}, 0);
				navigate('/');
			} else {
				setTimeout(() => {
					alert(`Error. ${data.response.data.message}`);
				}, 0);
			}
		});
	};
	
	return (
		<section className="create-job">
			<Header />
		
			<main className="create-job__main main">
				<h1 className="main__title">Редагування вакансії</h1>
				
				<ul className="main__items items">
					<li className="items__item">
						<span>Роботодавець:</span>
					
						<InputWrapperEdit
							name='eployeerName'
							beginingValue={input.eployeerName}
							placeholder={''}
							onChange={changeHandler}
							errorMessage={errors?.eployeerName}
						/>
					</li>
					
					<li className="items__item">
						<span>Телефон:</span>
					
						<InputWrapperEdit
							name='number'
							beginingValue={input.number}
							placeholder={''}
							onChange={changeHandler}
							errorMessage={errors?.number}
						/>
					</li>
				
					<li className="items__item">
						<span>Посада:</span>
					
						<InputWrapperEdit
							name='position'
							beginingValue={input.position}
							placeholder={''}
							onChange={changeHandler}
							errorMessage={errors?.position}
						/>
					</li>

					<li className="items__item">
						<span>Місто роботи:</span>
					
						<InputWrapperEdit
							name='place'
							beginingValue={input.place}
							placeholder={''}
							onChange={changeHandler}
							errorMessage={errors?.place}
						/>
					</li>

					<li className="items__item">					
						<CreateJobFilter
							jobFilterHandler={jobFilterHandler}
						/>
					</li>

					<li className="items__item">
						<span>Зарплата на цій посаді:</span>
						
						<div className="salary">
							<InputWrapperEdit
								name='salaryMin'
								beginingValue={input.salaryMin}
								placeholder={'Від'}
								onChange={changeHandler}
								errorMessage={errors?.salaryMin}
							/>
							
							<InputWrapperEdit
								name='salaryMax'
								beginingValue={input.salaryMax}
								placeholder={'До'}
								onChange={changeHandler}
								errorMessage={errors?.salaryMax}
							/>
						</div>
					</li>

					<li className="items__item description">
						<span>Опишість вакансію:</span>
					
						<TextareaWrapperEdit
							name='description'
							beginingValue={input.description}
							placeholder={'Вимоги. Умови роботи. Обов`язки'}
							onChange={changeHandler}
							errorMessage={errors?.description}
						/>
					</li>					
					
					<li className="items__item job-filter">
						<Button 
							text='Опублікувати'
							clickHandler={buttonClickHandler}
						/>
					</li>
				</ul>
			</main>
			
			<Footer />
			
			<LoadingMessage isShow={isLoading} />
		</section>
	);
}

export default EditJob;