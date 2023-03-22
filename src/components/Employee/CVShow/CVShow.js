import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../Header/Header';
import Button from '../../_commonComponents/Button/Button';
import LoadingMessage from '../../_commonComponents/LoadingMessage/LoadingMessage';
import Footer from '../../Footer/Footer';

import { 
	get,
	deleteMethod
} from '../../../services';

let cvId = null;

const CVShow = () => {
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
	
	const [resumeInfo, setResumeInfo] = useState({...data});
	const [isResumeCreated, setIsResumeCreated] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	
	const token = useSelector(state => state.token);
	
	useEffect(() => {
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
					setResumeInfo(data.candidates[len - 1]);
					
					cvId = candidates[0]._id;
				} else {
					cvId = null;
				}
			} else {
				setTimeout(() => {
					alert(`Can't load data. ${data.response.data.message}`);
				}, 0);
			}
		});
	}, []);
	
	const buttonClickHandler = () => {
	};
	
	const deleteButtonHandler = e => {
		e.preventDefault();
		
		const request = {
			urlPoint: '/candidates/' + cvId,
			token
		};
		
		deleteMethod(request, ({ isSuccess, data }) => {
			if (isSuccess) {
				alert('Succuss!');
			} else {				
				alert(`Can't delete. ${data.response.data.message}`);
			}
		});
	};
	
	return (
		<section className="cv-show">
			<Header />
		
			<main className="cv-show__main main">
				{	!isResumeCreated
					&&
					<h2 className="main__title">Резюме порожнє</h2>
				}
				
				{	isResumeCreated
					&&
					<>
						<h2 className="main__title">Резюме</h2>
							
						<section className="main__content content">
							<div className="content__title">
								<h4>Візитка</h4>
							</div>
							
							<ul className="content__items items">
								<li className="items__item">
									<span>Ім'я та прізвище:</span>
									
									{resumeInfo.name}
								</li>
								
								<li className="items__item">
									<span>Посада, на якій хочеш працювати:</span>
									
									{resumeInfo.positionWant}
								</li>
								
								<li className="items__item">
									<span>Дата народження:</span>
									
									{resumeInfo.birth}
								</li>
								
								<li className="items__item">
									<span>Номер телефону:</span>
									
									{resumeInfo.phoneNumber}
								</li>
								
								<li className="items__item">
									<span>Місто пошуку роботи:</span>
									
									{resumeInfo.region}
								</li>
							</ul>
						</section>
						
						<section className="main__content content">
							<div className="content__title">
								<h4>Досвід роботи</h4>
								
								<span className="content__sub-title">Oстаннє місце роботи</span>
							</div>
							
							<ul className="content__items items">
								<li className="items__item">
									<span>Назва компанії:</span>
									
									{resumeInfo.company}
								</li>
								
								<li className="items__item">
									<span>Посада:</span>
									
									{resumeInfo.position}
								</li>
								
								<li className="items__item">
									<span>Період роботи з:</span>
									
									{resumeInfo.workDateFrom}
								</li>
								
								<li className="items__item">
									<span>Період роботи по:</span>
									
									{resumeInfo.workDateTo}
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
									
									{resumeInfo.educationLevel}
								</li>
								
								<li className="items__item">
									<span>Навчальний заклад:</span>
									
									{resumeInfo.educationPlace}
								</li>
								
								<li className="items__item">
									<span>Спеціальність:</span>
									
									{resumeInfo.speciality}
								</li>
								
								<li className="items__item">
									<span>Період навчання з:</span>
									
									{resumeInfo.studyDateFrom}
								</li>
								
								<li className="items__item">
									<span>Період навчання по:</span>
									
									{resumeInfo.studyDateTo}
								</li>
							</ul>
						</section>
						
						<div className="main__button-wrapper">
							<div className="main__button">
								<Link
									to={'/'}
									className="button"
								>
									OK
								</Link>
							</div>
							
							<div className="main__button">
								<Link
									to={'/resume-edit'}
									className="button"
								>
									Редагувати
								</Link>
							</div>
						</div>
						</>
					}
			</main>
			
			<Footer />
		</section>
	);
}

export default CVShow;