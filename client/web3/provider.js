import Web3 from 'web3';
import contract from 'truffle-contract';

const provider = () => {
  if (typeof web3 !== 'undefined') {
    return web3.currentProvider;
  } else {
    console.error('You need to install MetaMask');
  }
};

export const getInstance = (artifact) => {
  const contractObject = contract(artifact);
  contractObject.setProvider(provider());

  return contractObject.deployed();
};

export const eth = new Web3(provider()).eth;