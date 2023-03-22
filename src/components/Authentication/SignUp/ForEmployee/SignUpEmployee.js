import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../../Header/Header';
import InputWrapper from '../../../_commonComponents/InputWrapper/InputWrapper';
import Button from '../../../_commonComponents/Button/Button';
import LoadingMessage from '../../../_commonComponents/LoadingMessage/LoadingMessage';

import { routerArray } from '../../../../constants/router';

import { sign } from '../../../../services';

import {
	mailValidator,
	passwordValidator,
	errorList
} from '../../../../services/validations';

const SignUpEmployee = () => {
	// Input fields value
	const [input, setInput] = useState({
		mail: '',
		password: '',
		passwordRepeat: '',
	});	
	// Input fields value errors
	const [errors, setErrors] = useState({
		mail: '',
		password: '',
		passwordRepeat: ''
	});
	
	const [isLoading, setIsLoading] = useState(false);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	// Get data and save using 'name' for recognizing
	const changeHandler = e => {		
		const { name, value } = e.target
		
		setInput(prev => ({
			...prev,
			[name]: value
		}));
	};
	
	// Validating data
	const buttonClickHandler = () => {
		let isAllCorrect = true;
		setErrors({
			mail: '',
			passwod: '',
			passwordRepeat: ''
		});
		
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
				password: errorList['passwordValidator']
			}));
		}
		
		if (!passwordValidator(input.passwordRepeat)) {
			isAllCorrect = false;
			setErrors(prev => ({
				...prev,
				passwordRepeat: errorList['passwordValidator']
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
		
		// - Try to Sign Un
		const request = {
			urlPoint: '/auth/signup',
			props: {
				email: input.mail,
				password: input.password,
				roles: 'user'
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
					type: 'setEmail',
					value: null
				});
				dispatch({
					type: 'setUserRole',
					value: 'undefined'
				});
				
				setTimeout(() => {
					alert(`Error. ${data.response.data.message}`);
				}, 0);
			}
		});
	};
	
	return (
		<section className="sign-up-employee">
			<Header />
			
			<h2 className="sign-up-employee__title">Реєстрація</h2>
		
			<main className="sign-up-employee__main main">
				<div className="main__field">				
					<span>Електронна пошта:</span>
					
					<InputWrapper
						name='mail'
						onChange={changeHandler}
						errorMessage={errors?.mail}
					/>
				</div>
				
				<div className="main__field">				
					<span>Пароль:</span>
					
					<InputWrapper
						name='password'
						onChange={changeHandler}
						errorMessage={errors?.password}
					/>
				</div>
				
				<div className="main__field">				
					<span>Повторити пароль:</span>
					
					<InputWrapper
						name='passwordRepeat'
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