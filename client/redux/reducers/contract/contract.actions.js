import ContractActionTypes from './contract.types';

import { loadWeb3 } from './contract.utils';

import UserStorage from '../../../web3/artifacts/UserStorage.json';
import UserController from '../../../web3/artifacts/UserController.json';
import TweetStorage from '../../../web3/artifacts/TweetStorage.json';
import TweetController from '../../../web3/artifacts/TweetController.json';

export const loadContracts = () => async (dispatch) => {
  await loadWeb3();

  const networkId = 5777;
  const web3 = window.web3;

  const accounts = await web3.eth.getAccounts();

  const userStorage = new web3.eth.Contract(
    UserStorage.abi,
    UserStorage.networks[networkId].address
  );

  const userController = new web3.eth.Contract(
    UserController.abi,
    UserController.networks[networkId].address
  );

  const tweetStorage = new web3.eth.Contract(
    TweetStorage.abi,
    TweetStorage.networks[networkId].address
  );

  const tweetController = new web3.eth.Contract(
    TweetController.abi,
    TweetController.networks[networkId].address
  );

  dispatch({
    type: ContractActionTypes.LOAD_CONTRACTS,
    payload: {
      account: accounts[0],
      userController,
      userStorage,
      tweetController,
      tweetStorage
    }
  });
};
