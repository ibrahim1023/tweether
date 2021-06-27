pragma solidity >=0.4.22 <0.8.0;

import "../helpers/BaseStorage.sol";

contract UserStorage is BaseStorage {
	uint latestUserId = 0;

	mapping (uint => Profile) public profiles;
	
	struct Profile {
		uint id;
		bytes32 username;
	}

	function createUser (bytes32 _username) public onlyController returns(uint) {
		latestUserId++;

		profiles[latestUserId] = Profile(latestUserId, _username);
		return latestUserId;
	}
	
}