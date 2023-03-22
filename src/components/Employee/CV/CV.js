import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../Header/Header';
import Button from '../../_commonComponents/Button/Button';
import InputWrapper from '../../_commonComponents/InputWrapper/InputWrapper';
import LoadingMessage from '../../_commonComponents/LoadingMessage/LoadingMessage';
import Footer from '../../Footer/Footer';

import { 
	commonValidator,
	errorList
} from '../../../services/validations';

import { post } from '../../../services';

const CV = () => {
	const data = {
		name: '',
		positionWant: '',
		birth: '',
		phoneNumber: '',
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
	
	const [input, setInput] = useState({...data});	
	const [errors, setErrors] = useState(null);
	
	const email = useSelector(state => state.email);
	const token = useSelector(state => state.token);
	const navigate = useNavigate();	
	const [isLoading, setIsLoading] = useState(false);
	
	const changeHandler = e => {
		const { name, value } = e.target;
		
		setInput(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	const buttonClickHandler = () => {
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
		
		// - Sending to the server
		const request = {
			urlPoint: '/candidates',
			props: {
				email,
				...input
			},
			token
		};		
		
		setIsLoading(true);
		
		post(request, ({ isSuccess, data }) => {
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
		<section className="cv">
			<Header />
		
			<main className="cv__main main">
				<h2 className="main__title">Резюме</h2>
				
				<section className="main__content content">
					<div className="content__title">
						<h4>Візитка</h4>
					</div>
					
					<ul className="content__items items">
						<li className="items__item">
							<span>Ім'я та прізвище:</span>
							
							<InputWrapper
								name='name'
								beginingValue={''}
								onChange={changeHandler}
								errorMessage={errors?.name}
							/>
						</li>
						
						<li className="items__item">
							<span>Посада, на якій хочеш працювати:</span>
							
							<InputWrapper
								name='positionWant'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.positionWant}
							/>
						</li>
						
						<li className="items__item">
							<span>Дата народження:</span>
							
							<InputWrapper
								name='birth'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.birth}
							/>
						</li>
						
						<li className="items__item">
							<span>Номер телефону:</span>
							
							<InputWrapper
								name='phoneNumber'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.phoneNumber}
							/>
						</li>
						
						<li className="items__item">
							<span>Місто пошуку роботи:</span>
							
							<InputWrapper
								name='region'
								placeholder={''}
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
							
							<InputWrapper
								name='company'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.company}
							/>
						</li>
						
						<li className="items__item">
							<span>Посада:</span>
							
							<InputWrapper
								name='position'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.position}
							/>
						</li>
						
						<li className="items__item">
							<span>Період роботи з:</span>
							
							<InputWrapper
								name='workDateFrom'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.workDateFrom}
							/>
						</li>
						
						<li className="items__item">
							<span>по:</span>
							
							<InputWrapper
								name='workDateTo'
								placeholder={''}
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
							
							<InputWrapper
								name='educationLevel'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.educationLevel}
							/>
						</li>
						
						<li className="items__item">
							<span>Навчальний заклад:</span>
							
							<InputWrapper
								name='educationPlace'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.educationPlace}
							/>
						</li>
						
						<li className="items__item">
							<span>Спеціальність:</span>
							
							<InputWrapper
								name='speciality'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.speciality}
							/>
						</li>
						
						<li className="items__item">
							<span>Період навчання з:</span>
							
							<InputWrapper
								name='studyDateFrom'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.studyDateFrom}
							/>
						</li>
						
						<li className="items__item">
							<span>по:</span>
							
							<InputWrapper
								name='studyDateTo'
								placeholder={''}
								onChange={changeHandler}
								errorMessage={errors?.studyDateTo}
							/>
						</li>
					</ul>
				</section>
				
				<div className="main__button">
					<Button 
						text='Зберегти'
						clickHandler={buttonClickHandler}
					/>
				</div>
			</main>
			
			<Footer />
			
			<LoadingMessage isShow={isLoading} />
		</section>
	);
}

export default CV;