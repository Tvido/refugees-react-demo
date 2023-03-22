import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Header from '../../Header/Header';
import Button from '../../_commonComponents/Button/Button';
import InputWrapperEdit from '../../_commonComponents/InputWrapperEdit/InputWrapperEdit';
import Footer from '../../Footer/Footer';
import LoadingMessage from '../../_commonComponents/LoadingMessage/LoadingMessage';

import { commonValidator, errorList } from '../../../services/validations';

import { useSelector } from 'react-redux';

import {
	get,
	put
} from '../../../services';

const data = {
	name: '',
	birth: '',
	phoneNumber: '',
	positionWant: '',
	region: '',
	
	company: '',
	position: '',
	workDateFrom: '',
	workDateTo: '',

	educationLevel: '',
	educationPlace: '',
	speciality: '',
	studyDateFrom: '',
	studyDateTo: ''
};

let isCVChanged = false;

const CV = () => {
	const [input, setInput] = useState({...data});	
	const [errors, setErrors] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isResumeCreated, setIsResumeCreated] = useState(false);
	
	useEffect(() => {
		isCVChanged = false;
		
		const request = {
			urlPoint: '/candidates',
			token
		};
		
		setIsLoading(true);
		
		get(request, ({ isSuccess, data }) => {
			setIsLoading(false);
			
			if (isSuccess) {				
				const candidates = data.candidates;				
				const len = candidates.length;
				
				if (len > 0) {
					setIsResumeCreated(true);					
					const {
						name,
						birth,
						phoneNumber,
						positionWant,
						region,						
						company,
						position,
						workDateFrom,
						workDateTo,
						educationLevel,
						educationPlace,
						speciality,
						studyDateFrom,
						studyDateTo
					} = data.candidates[len - 1];					
					setInput({
						name,
						birth,
						phoneNumber,
						positionWant,
						region,						
						company,
						position,
						workDateFrom,
						workDateTo,
						educationLevel,
						educationPlace,
						speciality,
						studyDateFrom,
						studyDateTo
					});
				}
			} else {
				setTimeout(() => {
					alert(`Can't load data. ${data.response.data.message}`);
				}, 0);
			}
		});
	}, []);
	
	const token = useSelector(state => state.token);
	const email = useSelector(state => state.email);
	const navigate = useNavigate();
	
	const changeHandler = e => {
		isCVChanged = true;
		
		const { name, value } = e.target;
		
		setInput(prev => ({
			...prev,
			[name]: value
		}));
	}
	
	const buttonSaveClickHandler = () => {
		if (!token) {
			alert('Вам потрібно спочатку увійти в програму');
			return;
		}
		
		let isAllCorrect = true;
		setErrors({...data});
		
		// Card ---------------------------------
		if (!commonValidator(input.name)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				name: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.positionWant)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				positionWant: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.birth)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				birth: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.phoneNumber)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				phoneNumber: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.region)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				region: errorList['commonValidator']
			}));
		}
		
		// Experience ---------------------------------
		if (!commonValidator(input.company)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				company: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.position)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				positionWant: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.workDateFrom)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				workDateFrom: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.workDateTo)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				workDateTo: errorList['commonValidator']
			}));
		}
		
		// Education ---------------------------------
		if (!commonValidator(input.educationLevel)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				educationLevel: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.educationPlace)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				educationPlace: 'Некоректнa інформація'
			}));
		}
		
		if (!commonValidator(input.speciality)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				speciality: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.studyDateFrom)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				studyDateFrom: errorList['commonValidator']
			}));
		}
		
		if (!commonValidator(input.studyDateTo)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				studyDateTo: errorList['commonValidator']
			}));
		}
		
		if (!isAllCorrect) {
			return;
		}
		
		if (!isCVChanged) {
			alert('Success');
			navigate('/');
			return;
		}
		
		const request = {
			urlPoint: '/candidates',
			props: {
				email,
				...input
			},
			token
		};
		
		setIsLoading(true);
		
		put(request, ({ isSuccess, data }) => {
			setIsLoading(false);
			
			if (isSuccess) {				
				setTimeout(() => {
					alert('Success');
				}, 0);
				navigate('/');
			} else {
				setTimeout(() => {
					alert(`Can't save. ${data.response.data.message}`);
				}, 0);
			}
		});
	};
	
	return (
		<section className="cv-edit">
			<Header />
		
			<main className="cv-edit__main main">
				{	!isResumeCreated
					&&
					<h2 className="main__title">Резюме порожнє</h2>
				}
				
				{	isResumeCreated
					&&
					<>
			
						<h2 className="main__title">Резюме редагування</h2>
						
						<section className="main__content content">
							<div className="content__title">
								<h4>Візитка</h4>
							</div>
							
							<ul className="content__items items">
								<li className="items__item">
									<span>Ім'я та прізвище:</span>
									
									<InputWrapperEdit
										name='name'
										beginingValue={input.name}
										onChange={changeHandler}
										errorMessage={errors?.name}
									/>
								</li>
								
								<li className="items__item">
									<span>Посада, на якій хочеш працювати:</span>
									
									<InputWrapperEdit
										name='positionWant'
										beginingValue={input.positionWant}
										onChange={changeHandler}
										errorMessage={errors?.positionWant}
									/>
								</li>
								
								<li className="items__item">
									<span>Дата народження:</span>
									
									<InputWrapperEdit
										name='birth'
										beginingValue={input.birth}
										onChange={changeHandler}
										errorMessage={errors?.birth}
									/>
								</li>
								
								<li className="items__item">
									<span>Номер телефону:</span>
									
									<InputWrapperEdit
										name='phoneNumber'
										beginingValue={input.phoneNumber}
										onChange={changeHandler}
										errorMessage={errors?.phoneNumber}
									/>
								</li>
								
								<li className="items__item">
									<span>Місто пошуку роботи:</span>
									
									<InputWrapperEdit
										name='region'
										beginingValue={input.region}
										onChange={changeHandler}
										errorMessage={errors?.region}
									/>
								</li>
							</ul>
						</section>
						
						<section className="main__content content">
							<div className="content__title">
								<h4>Досвід роботи</h4>
								
								<span className="content__sub-title">Додайте своє останнє місце роботи</span>
							</div>
							
							<ul className="content__items items">
								<li className="items__item">
									<span>Назва компанії:</span>
									
									<InputWrapperEdit
										name='company'
										beginingValue={input.company}
										onChange={changeHandler}
										errorMessage={errors?.company}
									/>
								</li>
								
								<li className="items__item">
									<span>Посада:</span>
									
									<InputWrapperEdit
										name='position'
										beginingValue={input.position}
										onChange={changeHandler}
										errorMessage={errors?.position}
									/>
								</li>
								
								<li className="items__item">
									<span>Період роботи з:</span>
									
									<InputWrapperEdit
										name='workDateFrom'
										beginingValue={input.workDateFrom}
										onChange={changeHandler}
										errorMessage={errors?.workDateFrom}
									/>
								</li>
								
								<li className="items__item">
									<span>по:</span>
									
									<InputWrapperEdit
										name='workDateTo'
										beginingValue={input.workDateTo}
										onChange={changeHandler}
										errorMessage={errors?.workDateTo}
									/>
								</li>
							</ul>
						</section>
						
						<section className="main__content content">
							<div className="content__title">
								<h4>Освіта</h4>
							</div>
							
							<ul className="content__items items">
								<li className="items__item">
									<span>Рівень освіти:</span>
									
									<InputWrapperEdit
										name='educationLevel'
										beginingValue={input.educationLevel}
										onChange={changeHandler}
										errorMessage={errors?.educationLevel}
									/>
								</li>
								
								<li className="items__item">
									<span>Навчальний заклад:</span>
									
									<InputWrapperEdit
										name='educationPlace'
										beginingValue={input.educationPlace}
										onChange={changeHandler}
										errorMessage={errors?.educationPlace}
									/>
								</li>
								
								<li className="items__item">
									<span>Спеціальність:</span>
									
									<InputWrapperEdit
										name='speciality'
										beginingValue={input.speciality}
										onChange={changeHandler}
										errorMessage={errors?.speciality}
									/>
								</li>
								
								<li className="items__item">
									<span>Період навчання з:</span>
									
									<InputWrapperEdit
										name='studyDateFrom'
										beginingValue={input.studyDateFrom}
										onChange={changeHandler}
										errorMessage={errors?.studyDateFrom}
									/>
								</li>
								
								<li className="items__item">
									<span>по:</span>
									
									<InputWrapperEdit
										name='studyDateTo'
										beginingValue={input.studyDateTo}
										onChange={changeHandler}
										errorMessage={errors?.studyDateTo}
									/>
								</li>
							</ul>
						</section>
						
						<div className="main__button">
							<Button 
								text='Зберегти'
								clickHandler={buttonSaveClickHandler}
							/>
						</div>
					</>
					}
					</main>
			
			<Footer />
		</section>
	);
}

export default CV;