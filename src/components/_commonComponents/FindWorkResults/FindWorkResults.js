import { useState } from 'react';
import { useSelector } from 'react-redux';

import JobCard from '../../_commonComponents/JobCard/JobCard';
import Button from '../../_commonComponents/Button/Button';

import { post } from '../../../services';

const FindWorkResults = ({ data, canBeSaved=true }) => {
	const [isSelectedShow, setIsSelectedShow] = useState(false);
	const [selectedCardInfo, setSelectedCardInfo] = useState({});
	
	const token = useSelector(state => state.token);
	
	if (!data) {
		return;
	}
	
	if (data.length == 0) {
		return <h3 className="no-results">No results</h3>;
	}
	
	const jobCardSelected = (item) => {
		setSelectedCardInfo(item);
		setIsSelectedShow(true);
	};
	
	const items = data.map((item, index) => {		
		return (
			<li
				className="items__item item"
				key	={index}
				onClick={() => jobCardSelected(item)}
			>
				<JobCard
					item = {item}
				/>
			</li>
		);
	});
	
	const saveVacancy = () => {
		const {
			eployeerName,
			number,
			position,
			salarMax,
			type,
			place,
			description
		} = selectedCardInfo;
		
		const request = {
			urlPoint: '/favorites',
			props: {
				eployeerName,
				number,
				position,
				salarMax,
				type,
				place,
				description
			},
			token
		};
		
		post(request, ({ isSuccess, data }) => {
			if (isSuccess) {
				setTimeout(() => {
					alert('Success');
				}, 0);
			} else {
				setTimeout(() => {
					alert(`Can't save. ${data.response.data.message}`);
				}, 0);
			}
		});
		
		setIsSelectedShow(false);
	};
	
	const applyOffer = () => {
		setIsSelectedShow(false);
	};
	
	const cancel = () => {
		setIsSelectedShow(false);
	};
	
	return (
		<section className="find-work-results">
		{	!isSelectedShow
			&&
			<ul className="find-work-results__items items">				
				{items}
			</ul>
		}
			
			{	isSelectedShow
				&&			
				<div className="find-work-results__selected-outer">
					<div className="selected">
						<h4 className="selected__item selected__title">{selectedCardInfo?.position}</h4>
						
						<p className="selected__item selected__employeer"><span className="bold">{selectedCardInfo?.eployeerName}</span></p>
						
						<p className="selected__item selected__phone">Телефон: {selectedCardInfo?.number}</p>
						
						<p className="selected__item selected__location">Розташування: {selectedCardInfo?.place}</p>
						 
						<p className="selected__item selected__salary">Заробітна плата: {selectedCardInfo?.salaryMin} - {selectedCardInfo?.salaryMax}</p>
						
						<p className="selected__item selected__type">{selectedCardInfo?.type}</p>
						
						<p className="selected__item selected__requirements">{selectedCardInfo?.description}</p>
						
						<div className="selected__button-wrapper">
							{	canBeSaved
								&&
								<Button
									text='Зберегти вакансію'
									clickHandler={saveVacancy}
								/>
							}
							
							<Button
								text='Надіслати заявку'
								clickHandler={applyOffer}
							/>
							
							<Button
								text='Cancel'
								clickHandler={cancel}
							/>
						</div>
					</div>
				</div>
			}
		</section>
	);
}

export default FindWorkResults;