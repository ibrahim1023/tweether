import { combineReducers } from 'redux';

import { contractReducer, userReducer } from './contract/contract.reducer';

const rootReducer = combineReducers({
  contract: contractReducer,
  user: userReducer
});

export default rootReducer;
