import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { loadContracts } from '../../redux/reducers/contract/contract.actions';

const HomePage = () => {
  const [username, setUsername] = useState('ibrahim');
  const dispatch = useDispatch();

  const { account, userController, userStorage } = useSelector(
    (state) => state.contract.data
  );

  useEffect(() => {
    dispatch(loadContracts());
  }, []);

  const logUser = async () => {
    const profile = await userStorage.methods.profiles(1).call();
    console.log('Profile: ', profile);
  };

  const createUser = async () => {
    try {
      const result = await userController.methods
        .createUser(web3.utils.fromAscii(username))
        .send({
          from: account
        });

      return result;
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div>
      <button onClick={logUser}>Get user with ID 1</button>
      <button onClick={createUser}>Create User</button>
    </div>
  );
};

export default HomePage;
