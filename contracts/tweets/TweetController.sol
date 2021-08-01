pragma solidity ^0.5.10;

import "../helpers/BaseController.sol";
import "../ContractManager.sol";
import "./TweetStorage.sol";
import "../users/UserStorage.sol";

contract TweetController is BaseController {

	function createTweet (string memory _text) public returns(uint) {
		ContractManager _manager = ContractManager(managerAddr);
		UserStorage _userStorage = UserStorage(_manager.getAddress("UserStorage"));

		// get the correct user ID from addresses
		uint _userId = _userStorage.addresses(msg.sender);

		require (_userId != 0);

		TweetStorage _tweetStorage = TweetStorage(_manager.getAddress("TweetStorage"));

		return _tweetStorage.createTweet(_userId, _text);
	}	
	
}
