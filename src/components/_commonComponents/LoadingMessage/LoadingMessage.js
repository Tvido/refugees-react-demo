import { useState } from 'react';

const LoadingMessage = ({ isShow }) => {
	if (!isShow) {
		return;
	}
	
	return (
		<section className="loading-message">
			<h2>Loading</h2>
		</section>
	);
}

export default LoadingMessage;