pragma solidity ^0.5.10;

import "../helpers/BaseController.sol";
import "../ContractManager.sol";
import "./UserStorage.sol";

contract UserController is BaseController {

	function createUser (bytes32 _username) public returns(uint) {
		ContractManager _manager = ContractManager(managerAddr);
		UserStorage _userStorage = UserStorage(_manager.getAddress("UserStorage"));

		return _userStorage.createUser(_username);
	}	
}
