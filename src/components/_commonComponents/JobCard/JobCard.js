const JobCard = ({ item }) => {
	const { 
		eployeerName,
		position,
		salaryMin,
		salaryMax,
		number,
		place,
		type, 
		description 
	} = item;
	
	return (
		<div className="job-card">
			<h4 className="job-card__title">Роботодавець: {eployeerName}</h4>

			<p className="job-card__type">{position}</p>

			{	(salaryMax || salaryMin)
				&&			
				<p>Зарплата: {salaryMin} - {salaryMax}</p>
			}
			
			<p className="job-card__type">Номер телефону: {number}</p>

			<p className="job-card__type">Місто: {place}</p>

			<p className="job-card__type">Тип зайнятості: {type}</p>
			
			<p>Інформація: {description}</p>
		</div>	
	);
}

export default JobCard;