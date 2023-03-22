import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../../Header/Header';
import InputWrapper from '../../../_commonComponents/InputWrapper/InputWrapper';
import Button from '../../../_commonComponents/Button/Button';
import LoadingMessage from '../../../_commonComponents/LoadingMessage/LoadingMessage';

import { routerArray } from '../../../../constants/router';

import {
	mailValidator,
	passwordValidator,
	companyNameValidator,
	commonValidator,
	errorList
} from '../../../../services/validations';

import { sign } from '../../../../services';

const SignUpEmployee = () => {
	// Input fields value
	const [input, setInput] = useState({
		companyName: '',
		name: '',
		mail: '',
		password: '',
		passwordRepeat: '',
	});
	
	// Input fields value errors
	const [errors, setErrors] = useState({
		companyName: '',
		name: '',
		mail: '',
		password: '',
		passwordRepeat: ''
	});
	
	const [isLoading, setIsLoading] = useState(false);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	// Get data and save using 'name' for recognizing
	const changeHandler = e => {		
		const { name, value } = e.target;
		
		setInput(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	// Validating data
	const buttonClickHandler = () => {
		let isAllCorrect = true;
		setErrors({
			companyName: '',
			name: '',
			mail: '',
			passwod: '',
			passwordRepeat: ''
		});
		if (!companyNameValidator(input.companyName)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				companyName: errorList['companyNameValidator']
			}));
		}
		
		if (!commonValidator(input.name)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				name: errorList['commonValidator']
			}));
		}
		
		if (!mailValidator(input.mail)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				mail: errorList['mailValidator']
			}));
		}
		
		if (!passwordValidator(input.password)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				password: errorList['mailValidator']
			}));
		}
		
		if (!passwordValidator(input.passwordRepeat)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				passwordRepeat: errorList['mailValidator']
			}));
		} else {
			if (input.password !== input.passwordRepeat) {
				isAllCorrect = false;
				setErrors(prev => ({
					...prev,
					passwordRepeat: 'Паролі не збігаються'
				}));
			}
		}
		
		if (!isAllCorrect) {
			return;
		}
		
		// - Try to Sign In
		const request = {
			urlPoint: '/auth/signup',
			props: {
				companyName: input.companyName,
				name: input.name,
				email: input.mail,
				password: input.password,
				roles: 'recruiter'
			}
		};
		
		setIsLoading(true);
		
		sign(request, ({ isSuccess, data }) => {
			setIsLoading(false);
			
			if (isSuccess) {
				// - Clearing data to the Storage	
				dispatch({
					type: 'setToken',
					value: null
				});				
				dispatch({
					type: 'setEmail',
					value: null
				});
				dispatch({
					type: 'setUserRole',
					value: 'undefined'
				});
				
				setTimeout(() => {
					alert('SignIn, будь-ласка, для продовження!');
				}, 0);				
				navigate('/entrance');
			} else {
				// - Saving data to the Storage	
				dispatch({
					type: 'setToken',
					value: null
				});
				dispatch({
					type: 'setUserRole',
					value: 'undefined'
				});
				dispatch({
					type: 'setEmail',
					value: null
				});

				setTimeout(() => {
					alert(`Error. ${data.response.data.message}`);
				}, 0);
			}
		});
	};
	
	return (
		<section className="sign-up-employeer sign-up-employee">
			<Header />
			
			<h2 className="sign-up-employeer__title">Реєстрація для роботодавця</h2>
		
			<main className="sign-up-employee__main main">
				<div className="main__field">				
					<span>Назва компанії:</span>
					
					<InputWrapper
						name='companyName'
						placeholder={''}
						onChange={changeHandler}
						errorMessage={errors?.companyName}
					/>
				</div>
				
				<div className="main__field">				
					<span>Ім'я, прізвище:</span>
					
					<InputWrapper
						name='name'
						placeholder={''}
						onChange={changeHandler}
						errorMessage={errors?.name}
					/>
				</div>
			
				<div className="main__field">				
					<span>Електронна пошта:</span>
					
					<InputWrapper
						name='mail'
						placeholder={''}
						onChange={changeHandler}
						errorMessage={errors?.mail}
					/>
				</div>
				
				<div className="main__field">				
					<span>Пароль:</span>
					
					<InputWrapper
						name='password'
						placeholder={''}
						onChange={changeHandler}
						errorMessage={errors?.password}
					/>
				</div>
				
				<div className="main__field">				
					<span>Повторити пароль:</span>
					
					<InputWrapper
						name='passwordRepeat'
						placeholder={''}
						onChange={changeHandler}
						errorMessage={errors?.passwordRepeat}
					/>
				</div>
				
				<div className="main__field">
					<Button 
						text='Зареєструватись'
						clickHandler={buttonClickHandler}
					/>
				</div>
			</main>
			
			<div className="sign-up-employee__invitation">
				<span>Уже є акаунт?</span>
				<span>
					<Link to={routerArray[1].path}>{routerArray[1].text}</Link>
				</span>
			</div>
			
			<LoadingMessage isShow={isLoading} />
		</section>
	);
}

export default SignUpEmployee;