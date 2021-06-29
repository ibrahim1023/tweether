import ContractActionTypes from './contract.types';

const INITIAL_STATE = {
  loading: false,
  account: 0x0,
  userStorage: null,
  userController: null,
  tweetStorage: null,
  tweetController: null,
  user: null,
  loggedIn: false
};

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractActionTypes.LOAD_CONTRACTS:
      return { ...state, ...action.payload };
    case ContractActionTypes.CREATE_USER_START:
      return { ...state, loading: true };
    case ContractActionTypes.CREATE_USER_END:
      return { ...state, loading: false };
    case ContractActionTypes.GET_LOGGED_IN_USER_START:
      return { ...state, loading: true };
    case ContractActionTypes.GET_LOGGED_IN_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, loggedIn: true };
    case ContractActionTypes.GET_USER_START:
      return { ...state, loading: true };
    case ContractActionTypes.GET_USER_END:
      return { ...state, loading: false };
    case ContractActionTypes.CREATE_TWEET_START:
      return { ...state, loading: true };
    case ContractActionTypes.CREATE_TWEET_END:
      return { ...state, loading: false };
    default:
      return { ...state };
  }
};

export default contractReducer;
