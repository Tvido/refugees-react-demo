import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../Header/Header';
import Button from '../../_commonComponents/Button/Button';
import FindWorkResults from '../../_commonComponents/FindWorkResults/FindWorkResults';
import LoadingMessage from '../../_commonComponents/LoadingMessage/LoadingMessage';
import Footer from '../../Footer/Footer';

import { 
	get
} from '../../../services';

const VacanciesShow = () => {	
	const [vacanciesAll, setVacanciesAll] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	
	const token = useSelector(state => state.token);
		
	useEffect(() => {
		const request = {
			urlPoint: '/vacancies/all',
			token
		};
		
		setIsLoading(true);
		
		get(request, ({ isSuccess, data }) => {
			setIsLoading(false);
			
			if (isSuccess) {
				setVacanciesAll(data.vacancies);
			} else {
				setTimeout(() => {
					alert(`Can't load data. ${data.response.data.message}`);
				}, 0);
			}
		});
	}, []);
	
	return (
		<section className="vacancies-show">
			<Header />
		
			<main className="vacancies-show__main main">
				{	vacanciesAll.length === 0
					&&
					<h2 className="main__title">Empty</h2>
				}
				{	vacanciesAll.length > 0
					&&
					<>
						<FindWorkResults 
							data={vacanciesAll}
						/>
					</>
				}
			</main>
			
			<Footer />
		</section>
	);
}

export default VacanciesShow;