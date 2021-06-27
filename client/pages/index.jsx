import React from 'react';

import { getUserInfo, createUser } from '../web3/users';

class App extends React.Component {
  logUser = async () => {
    const userInfo = await getUserInfo(1);
  };

  createUser = async () => {
    const tx = await createUser('ibrahim');
  };

  render() {
    return (
      <div>
        <button onClick={this.logUser}>Get user with ID 1</button>
        <button onClick={this.createUser}>Create User</button>
      </div>
    );
  }
}

export default App;
