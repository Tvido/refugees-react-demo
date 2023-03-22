const TextareaWrapper = ({ name, type='text', beginingValue='', placeholder, onChange, errorMessage='' }) => {
	return (
		<div className="textarea-wrapper">
			<textarea
				className="textarea-wrapper__textarea textarea"
				type={type}
				name={name}
				value={beginingValue}
				placeholder={placeholder}
				onChange={onChange}
			/>
			
			<span className="textarea__error">{errorMessage}</span>
		</div>
	);
}

export default TextareaWrapper;