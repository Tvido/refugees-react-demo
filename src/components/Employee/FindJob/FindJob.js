import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useRequest from '../../../services/loadingHook';

import Header from '../../Header/Header';
import FindWork from '../../_commonComponents/FindWork/FindWork';
import JobFilter from '../../_commonComponents/JobFilter/JobFilter';
import FindWorkResults from '../../_commonComponents/FindWorkResults/FindWorkResults';
import Button from '../../_commonComponents/Button/Button';
import Footer from '../../Footer/Footer';

import { getVacancies, get } from '../../../services';

const FindJob = () => {
	const [vacancies, setVacancies] = useState([]);
	const [filterOptions, setFilterOptions] = useState(null);
	const [findWorkResults, setFindWorkResults] = useState(null);
	const [isSelectedShow, setIsSelectedShow] = useState(false);

	useEffect(() => {
		const request = {
			urlPoint: '/vacancies/all'
		};
		
		getVacancies(request, ({ isSuccess, data }) => {
			if (isSuccess) {
				setVacancies(data.vacancies);
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
		
	const jobCardSelected = (item) => {
		setIsSelectedShow(prev => !prev);
	};
	
	const applyOffer = () => {
		setIsSelectedShow(false);
	};
	
	return (
		<section className="find-job">
			<Header />
			
			<main className="find-job__main main">
				<div className="main__left">
					<JobFilter
						filterType={1}
					/>
				</div>
				
				<div className="main__right right">
					<h2 className="right__title">Робота</h2>
					
					<div className="right__find-work">
						<FindWork
							vacanciesList={vacancies}
							filterOptions={filterOptions}
							findWorkResponse={findWorkResponseHandler}
						/>
					</div>
					
					<div className="main__find-results">
						<FindWorkResults
							data={findWorkResults}
						/>
					</div>
				</div>
			</main>
			
			<Footer />
		</section>
	);
}

export default FindJob;