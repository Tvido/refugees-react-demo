const InputWrapper = ({ name, type='text', placeholder, beginingValue='', onChange, errorMessage='' }) => {
	return (
		<div className="input-wrapper">
			<input
				className="input-wrapper__input"
				type={type}
				name={name}
				placeholder={placeholder}
				value={beginingValue}
				onChange={onChange}
			/>
			
			<span className="input-wrapper__error">{errorMessage}</span>
		</div>
	);
}

export default InputWrapper;