import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getVacancies, get } from '../../services';

import Header from '../Header/Header';
import FindWork from '../_commonComponents/FindWork/FindWork';
import Footer from '../Footer/Footer';
import FindWorkResults from '../_commonComponents/FindWorkResults/FindWorkResults';
import LoadingMessage from '../_commonComponents/LoadingMessage/LoadingMessage';

const MainPage = () => {
	const [vacanciesAll, setVacanciesAll] = useState([]);
	const [findWorkResults, setFindWorkResults] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const token = useSelector(state => state.token);
	
	useEffect(() => {
		const request = {
			urlPoint: '/vacancies/all'
		};
		
		setIsLoading(true);
		
		getVacancies(request, ({ isSuccess, data }) => {
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
	
	// Work searching results
	const findWorkResponseHandler = data => {
		setFindWorkResults(data);
	};
	
	return (
		<section className="main-page">
			<Header />
		
			<main className="main-page__main main">
				<h1 className="main__title">Пошук роботи для біженців</h1>
				
				<div className="main__find">
					<FindWork
						vacanciesList={vacanciesAll}
						findWorkResponse={findWorkResponseHandler}
					/>
				</div>
				
				<div className="main__find-results">
					<FindWorkResults
						data={findWorkResults}
					/>
				</div>
			</main>
			
			<Footer />
			
			<LoadingMessage isShow={isLoading} />
		</section>
	);
}

export default MainPage;