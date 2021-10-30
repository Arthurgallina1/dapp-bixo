// SPDX-License-Identifier: MIT
pragma solidity >=0.7.1 <0.9.0;

contract BichoGame {
    address public manager;
    address payable[] public players;
    mapping(address => uint256) balances;

    constructor() {
        manager = msg.sender;
    }

    receive() external payable {
        // require(msg.value > 100000 wei, "not enough value");
        players.push(payable(msg.sender));
    }

    function getPlayers() public view returns (address payable[] memory) {
        return players;
    }

    function getAddrBalance(address addr) public view returns (uint256) {
        return balances[addr];
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
