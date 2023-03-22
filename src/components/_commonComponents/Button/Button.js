const Button = ({ text, clickHandler }) => {	
	return (
		<button
			className="button"
			onClick={clickHandler}
		>
			{text}
		</button>
	);
}

export default Button;