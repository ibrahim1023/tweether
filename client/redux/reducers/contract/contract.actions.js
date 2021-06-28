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

export const createUser = (username) => async (dispatch, getState) => {
  dispatch({ type: ContractActionTypes.CREATE_USER_START });

  const {
    contract: { account, userController }
  } = getState();

  try {
    const result = await userController.methods
      .createUser(web3.utils.fromAscii(username))
      .send({
        from: account
      });

    // return result;
  } catch (error) {
    console.error('Error: ', error);
  }

  dispatch({ type: ContractActionTypes.CREATE_USER_END });
};

export const getUser = (userId) => async (dispatch, getState) => {
  dispatch({ type: ContractActionTypes.GET_USER_START });

  const {
    contract: { userStorage }
  } = getState();

  const profile = await userStorage.methods.profiles(userId).call();

  console.log('Profile: ', web3.utils.toAscii(profile.username));

  dispatch({ type: ContractActionTypes.GET_USER_START });
};

export const createTweet = (text) => async (dispatch, getState) => {
  dispatch({ type: ContractActionTypes.CREATE_TWEET_START });

  const {
    contract: { tweetController, account }
  } = getState();

  try {
    const result = await tweetController.methods.createTweet(1, text).send({
      from: account
    });
  } catch (error) {
    console.error('Error: ', error);
  }

  dispatch({ type: ContractActionTypes.CREATE_TWEET_END });
};

export const getTweet = (tweetId) => async (dispatch, getState) => {
  dispatch({ type: ContractActionTypes.GET_TWEET_START });

  const {
    contract: { tweetStorage }
  } = getState();

  const tweet = await tweetStorage.methods.tweets(tweetId).call();
  console.log('Tweet: ', tweet);

  dispatch({ type: ContractActionTypes.GET_TWEET_END });
};
