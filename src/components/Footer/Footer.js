import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
	employeeArray,
	employeerArray
} from '../../constants/router';

const Footer = () => {
	const roleKey = useSelector(state => state.roleKey);
	
	const employeeList = employeeArray.map(({ text, path }, index) => {
		return (
			<li
				className="footer__block-item"
				key={index}
			>
				<Link to={path}>
					{text}
				</Link>
			</li>
		);
	});
	
	const employeerList = employeerArray.map(({ text, path }, index) => {
		return (
			<li
				className="footer__block-item"
				key={index}
			>
				<Link to={path}>
					{text}
				</Link>
			</li>
		);
	});
	
	return (
		<footer className="footer">
			{	roleKey === 'undefined'
				&&
				<div className="hovered" />
			}			
			
			{	( roleKey === 'forEmployee' || roleKey === 'undefined' )
				&&
				<div className="footer__block">
					<h4 className="footer__block-title">Пошукачу</h4>
				
					<ul className="footer__block-items">
						{employeeList}
					</ul>
				</div>
			}
			
			{	( roleKey === 'forEmployeer'  || roleKey === 'undefined' )
				&&		
				<div className="footer__block">
					<h4 className="footer__block-title">Роботодавцю</h4>
				
					<ul className="footer__block-items">
						{employeerList}
					</ul>
				</div>
			}
		</footer>
	);
};

export default Footer;