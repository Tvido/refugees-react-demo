import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { routerArray } from '../../constants/router';
import { employeeArray } from '../../constants/router';

const Header = () => {
	const roleKey = useSelector(state => state.roleKey);
	const roleText = useSelector(state => state.roleText);
	const dispatch = useDispatch();
	
	const exitClickHandler = () => {
		dispatch({
			type: 'setToken',
			value: null
		});
		dispatch({
			type: 'setUserRole',
			value: 'undefined'
		});
	};
	
	return (
		<nav className="header">
			<Link to={routerArray[0].path} className="header-logo"><h4>{routerArray[0].text}</h4></Link>			
			
				<div className="header__right right">
					{	roleKey === 'forEmployee'
						&&
						<>
							<Link
								to={employeeArray[2].path}
								className="right__look-application"
							>
								{employeeArray[2].text}
							</Link>
							
							<Link
								to={employeeArray[5].path}
								className="right__look-application"
							>
								{employeeArray[5].text}
							</Link>
						</>
					}
				
					<p className="right__role">{roleText}</p>
					
					{	( roleKey === 'undefined' )
						&&					
						<Link
							to={routerArray[1].path}
							className="right__sign-in"
						>
							<img
								src="images/person.png"
								width="40"
								height="40"
							/>
							<p>{routerArray[1].text}</p>
						</Link>
					}
					
					{	( roleKey === 'forEmployee' || roleKey === 'forEmployeer' )
						&&					
						<Link
							to={'/'}
							className="right__sign-in"
							onClick={exitClickHandler}
						>
							<img
								src="images/person.png"
								width="40"
								height="40"
							/>
							<p>Exit</p>
						</Link>
					}
				</div>			
		</nav>
	);
}

export default Header;