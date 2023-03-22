const IconInputWrapper = ({ src, name, type='text', placeholder, onChange, errorMessage='' }) => {
	return (
		<div className="icon-input-wrapper">
			<img
				className="icon-input-wrapper__image"
				src={`images/${src}`}
				width="35"
				height="35"
				alt="img"
			/>
			
			<input
				className="icon-input-wrapper__input"
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
			/>
			
			<span className="icon-input-wrapper__error">{errorMessage}</span>
		</div>
	);
}

export default IconInputWrapper;