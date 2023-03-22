import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import IconInputWrapper from '../../_commonComponents/IconInputWrapper/IconInputWrapper';
import Button from '../../_commonComponents/Button/Button';
import LoadingMessage from '../../_commonComponents/LoadingMessage/LoadingMessage';

import {
	mailValidator,
	passwordValidator,
	errorList
} from '../../../services/validations';

import { routerArray } from '../../../constants/router';

import { sign } from '../../../services';

const SignIn = () => {
	const [forEmployee, setForEmployee] = useState(true);	
	const [input, setInput] = useState({
		mail: '',
		password: ''
	});
	const [errors, setErrors] = useState({
		mail: '',
		password: ''
	});	
	const [isLoading, setIsLoading] = useState(false);
	
	const dispatch = useDispatch();
	const navigate = useNavigate();
	
	// Set user role
	const setUserRole = isEmployee => () => {
		setForEmployee(isEmployee);
	};
	
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
		// - Validating input fields
		let isAllCorrect = true;
		setErrors({
			mail: '',
			passwod: ''
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
				password:errorList['passwordValidator']
			}));
		}
		
		if (!isAllCorrect) {
			return;
		}
		
		// - Try to Sign In
		const request = {
			urlPoint: '/auth/login',			
			props: {
				email: input.mail,
				password: input.password
			}
		};
		
		setIsLoading(true);
		
		sign(request, ({ isSuccess, data }) => {
			setIsLoading(false);
			
			if (isSuccess) {				
				// - Saving data to the Storage	
				dispatch({
					type: 'setToken',
					value: data.token
				});
				dispatch({
					type: 'setEmail',
					value: input.mail
				});
				dispatch({
					type: 'setUserRole',
					value: forEmployee ? 'forEmployee' : 'forEmployeer'
				});
				
				setTimeout(() => {
					alert('Success!');
				}, 0);
				navigate('/');
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
		<section className="sign-in">
			<Header />
			
			<h2 className="sign-in__title">вхід</h2>
		
			<main className="sign-in__main main">
				<div className="main__role">
					<span
						className={`${ forEmployee ? 'selected' : '' }`}
						onClick={ setUserRole(true) }
					>
						Пошукачу
					</span>
					
					<span
						className={`${ !forEmployee ? 'selected' : '' }`}
						onClick={ setUserRole(false) }
					>
						Роботодавцю
					</span>
				</div>
				
				<div className={`main__role-selector-left ${ !forEmployee ? 'main__role-selector-left_show' : '' }`}/>
				<div className={`main__role-selector-right ${ forEmployee ? 'main__role-selector-right_show' : '' }`}/>
				
				<div className="main__field">
					<IconInputWrapper
						src={'mail.png'}
						name='mail'
						placeholder={'Email'}
						onChange={changeHandler}
						errorMessage={errors.mail}
					/>
				</div>
				
				<div className="main__field">					
					<IconInputWrapper
						src={'password.png'}
						name='password'
						type='password'
						placeholder={'Password'}
						onChange={changeHandler}
						errorMessage={errors.password}
					/>
				</div>
				
				<div className="main__field">
					<Button 
						text='Увійти'
						clickHandler={buttonClickHandler}
					/>
				</div>
			</main>
			
			<div className="sign-in__invitation">
				<span>Ще не з нами?</span>
				{	forEmployee
					&&
					<span>
						<Link to={routerArray[2].path}>{routerArray[2].text}</Link>
					</span>
				}
				{	!forEmployee
					&&
					<span>
						<Link to={routerArray[3].path}>{routerArray[3].text}</Link>
					</span>
				}
			</div>
			
			<LoadingMessage isShow={isLoading} />
		</section>
	);
}

export default SignIn;