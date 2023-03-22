import { roleList } from '../../constants/state';

// roleKey: 'forEmployee'
// roleKey: 'forEmployeer'

const defaultState = {
	isSuccess: null,
	roleKey: 'undefined',
	roleText: 'undefined',
	token: null,
	email: null,
	
	cv : {
		businessCard: {}
	},
	
	vacanciesAll: null,
	vacancies: null,
	
	filterSalary: null,	
	filterActivity: [],
	createJobFilterActivity: null
};

function reducer(state = defaultState, action) {
	switch (action.type) {
		case 'setToken':
			// Authentication
			return {
				...state,
				token: action.value
			};
		case 'setEmail':
			// Authentication
			return {
				...state,
				email: action.value
			};
		case 'setUserRole':
			// Authentication
			return {
				...state,
				roleKey: action.value,
				roleText: roleList[action.value]
			};
			
		case 'setVacancies':
			// Vacancies
			return {
				...state,
				vacancies: action.value
			};
			
		case 'setFilterSalary':			
			return {
				...state,
				filterSalary: action.value
			}		
		case 'setFilterAction':			
			return {
				...state,
				filterActivity: action.value
			}
			
		case 'setCreateJobFilterActivity':
			// CreateJob filter
			return {
				...state,
				createJobFilterActivity: action.value
			}	
			
		default:
			return state;
	}
}

export default reducer;