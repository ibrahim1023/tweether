import ContractActionTypes from './contract.types';

const INITIAL_STATE = {
  data: {
    account: 0x0,
    userStorage: null,
    userController: null,
    tweetStorage: null,
    tweetController: null
  }
};

const contractReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ContractActionTypes.LOAD_CONTRACTS:
      return { ...state, data: action.payload };
    default:
      return { ...state };
  }
};

export default contractReducer;
