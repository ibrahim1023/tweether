import { loadWeb3, getInstance } from './provider';

import UserStorage from './artifacts/UserStorage.json';
import UserController from './artifacts/UserController.json';

export const getUserInfo = async (userId) => {
  await loadWeb3();

  const storage = await getInstance(UserStorage);
  const profile = await storage.methods.profiles(userId).call();

  return profile;
};

export const createUser = async (username) => {
  await loadWeb3();

  const web3 = window.web3;
  const controller = await getInstance(UserController);

  try {
    const addresses = await web3.eth.getAccounts();
    console.log('Addressses: ', addresses);

    const result = await controller.methods
      .createUser(web3.utils.fromAscii(username))
      .send({
        from: addresses[0]
      });

    return result;
  } catch (error) {
    console.error('Error: ', error);
  }
};
