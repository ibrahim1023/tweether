const ContractManager = artifacts.require("ContractManager");
const TweetStorage = artifacts.require("TweetStorage");
const TweetController = artifacts.require("TweetController");

module.exports = function(deployer) {

    deployer.deploy(TweetController)
        .then(() => {
            return TweetController.deployed()
        })
        .then(userCtrl => {
            userCtrl.setManagerAddr(ContractManager.address)
            return Promise.all([ContractManager.deployed(), TweetStorage.deployed()])
        })
        .then(([manager, storage]) => {
            return Promise.all([
                manager.setAddress("TweetController", TweetController.address),
                storage.setControllerAddr(TweetController.address)
            ])
        })
};