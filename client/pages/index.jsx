import React from 'react';

import { eth, getInstance } from '../web3/provider';

import UserStorage from '../web3/artifacts/UserStorage.json';

export default class IndexPage extends React.Component {
  async componentDidMount() {
    try {
      await ethereum.enable();
      const addresses = await eth.getAccounts();

      const userStorage = await getInstance(UserStorage);
      const { username } = await userStorage.profiles.call(1);
      console.log('Username: ', username);
    } catch (error) {
      console.error('User denied access to their ETH addresses');
    }
  }
  render() {
    return <h1>Hello world!</h1>;
  }
}
