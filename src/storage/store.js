import { createStore } from 'redux';
import reducer from './reducers/rootReducer';

const store = createStore(reducer);

// import { combineReducers } from 'redux';
// import { tagsReducer } from './tags/reducers';
// import { userReducer } from './users/reducers';


// const createRootReducer = () => combineReducers({
  // user: userReducer,
  // tags: tagsReducer,
// }); 


export default store;