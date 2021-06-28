import { combineReducers } from 'redux';

import contractReducer from './contract/contract.reducer';

const rootReducer = combineReducers({
  contract: contractReducer
});

export default rootReducer;
