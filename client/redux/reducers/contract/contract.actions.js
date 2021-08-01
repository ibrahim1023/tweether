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

export const createUser = (params) => async (dispatch, getState) => {
  dispatch({ type: ContractActionTypes.CREATE_USER_START });

  const {
    contract: { account, userController }
  } = getState();

  const username = web3.utils.fromAscii(params.username);
  const firstName = web3.utils.fromAscii(params.firstName);
  const lastName = web3.utils.fromAscii(params.lastName);

  try {
    await userController.methods
      .createUser(
        username,
        firstName,
        lastName,
        params.bio,
        params.gravatarEmail
      )
      .send({
        from: account
      });
  } catch (error) {
    console.error('Error: ', error);
  }

  dispatch({ type: ContractActionTypes.CREATE_USER_END });
};

export const getLoggedInUser = () => async (dispatch, getState) => {
  dispatch({ type: ContractActionTypes.GET_LOGGED_IN_USER_START });

  const {
    contract: { account, userStorage }
  } = getState();

  const userId = await userStorage.methods.addresses(account).call();
  const profile = await userStorage.methods.profiles(userId).call();

  const user = {
    id: userId,
    username: web3.utils.toAscii(profile.username),
    firstName: web3.utils.toAscii(profile.firstName),
    lastName: web3.utils.toAscii(profile.lastName),
    bio: profile.bio,
    gravatarEmail: profile.gravatarEmail
  };

  dispatch({
    type: ContractActionTypes.GET_LOGGED_IN_USER_SUCCESS,
    payload: user
  });
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
