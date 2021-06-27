import Web3 from 'web3';

let firstTime = true;

export const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    window.alert('Non-Ethereum browser detected!');
  }
};

export const getInstance = async (artifact) => {
  const web3 = window.web3;

  const contractObject = new web3.eth.Contract(
    artifact.abi,
    artifact.networks[5777].address
  );

  return contractObject;
};
