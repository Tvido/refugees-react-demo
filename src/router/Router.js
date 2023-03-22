import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { 
	routerArray,
	employeeArray,
	employeerArray
} from '../constants/router';

// Common
import MainPage from '../components/MainPage/MainPage';
import NotFound from '../components/NotFound/NotFound';

import SignIn from '../components/Authentication/SignIn/SignIn';
import SignUpEmployee from '../components/Authentication/SignUp/ForEmployee/SignUpEmployee';
import SignUpEmployeer from '../components/Authentication/SignUp/ForEmployeer/SignUpEmployeer';

// Employee
import CV from '../components/Employee/CV/CV';
import CVShow from '../components/Employee/CVShow/CVShow';
import CVEdit from '../components/Employee/CVEdit/CVEdit';
import FindJob from '../components/Employee/FindJob/FindJob';
import JobSearchTips from '../components/Employee/JobSearchTips/JobSearchTips';
import VacanciesShow from '../components/Employee/VacanciesShow/VacanciesShow';
import VacanciesSavedShow from '../components/Employee/VacanciesSavedShow/VacanciesSavedShow';

// Employeer
import CreateJob from '../components/Employeer/CreateJob/CreateJob';
import JobInfo from '../components/Employeer/JobInfo/JobInfo';
import EditJob from '../components/Employeer/EditJob/EditJob';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path={routerArray[0].path} element={<MainPage />} />
			
			<Route path={routerArray[1].path} element={<SignIn />} />
			<Route path={routerArray[2].path} element={<SignUpEmployee />} />
			<Route path={routerArray[3].path} element={<SignUpEmployeer />} />
			
			<Route path={employeeArray[0].path} element={<FindJob />} />
			<Route path={'show-job'} element={<JobInfo />} />
			<Route path={employeeArray[1].path} element={<CV />} />
			<Route path={employeeArray[2].path} element={<CVShow />} />
			<Route path={'resume-edit'} element={<CVEdit />} />
			<Route path={employeeArray[3].path} element={<JobSearchTips />} />
			<Route path={employeeArray[4].path} element={<VacanciesShow />} />
			<Route path={employeeArray[5].path} element={<VacanciesSavedShow />} />
			
			<Route path={employeerArray[0].path} element={<CreateJob />} />
			<Route path={'edit-job'} element={<EditJob />} />
			
			<Route element={<NotFound />} />
		</Routes>
	</BrowserRouter>
)

export default Router;