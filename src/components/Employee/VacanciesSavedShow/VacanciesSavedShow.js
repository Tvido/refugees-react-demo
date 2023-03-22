import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Header from '../../Header/Header';
import FindWorkResults from '../../_commonComponents/FindWorkResults/FindWorkResults';
import Button from '../../_commonComponents/Button/Button';
import Footer from '../../Footer/Footer';

import { 
	get
} from '../../../services';

const VacanciesSavedShow = () => {	
	const [vacanciesAll, setVacanciesAll] = useState([]);
	
	const token = useSelector(state => state.token);
		
	useEffect(() => {
		const request = {
			urlPoint: '/favorites',
			token
		};
		
		get(request, ({ isSuccess, data }) => {			
			if (isSuccess) {				
				setVacanciesAll(data.data.result);
			} else {
				setTimeout(() => {
					alert(`Can't load data. ${data.response.data.message}`);
				}, 0);
			}
		});
	}, []);
	
	return (
		<section className="vacancies-saved-show">
			<Header />
		
			<main className="vacancies-saved-show__main main">
				{	vacanciesAll.length === 0
					&&
					<h2 className="main__title">Empty</h2>
				}
				{	vacanciesAll.length > 0
					&&
					<>
						<h2 className="main__title">Збережені вакансії</h2>						
					
						<FindWorkResults 
							data={vacanciesAll}
							canBeSaved={false}
						/>
					</>
				}
			</main>
			
			<Footer />
		</section>
	);
}

export default VacanciesSavedShow;