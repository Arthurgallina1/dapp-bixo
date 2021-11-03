// SPDX-License-Identifier: MIT
pragma solidity >=0.7.1 <0.9.0;

contract BichoGame {
    address public manager;
    address payable[] public players;
    mapping(address => uint256) balances;
    mapping(address => bool) public playerParticipaing;

    constructor() {
        manager = msg.sender;
    }

    receive() external payable {
        // require(msg.value > 100000 wei, "not enough value");
        // require(!playerParticipaing[msg.sender], "player already playing");
        players.push(payable(msg.sender));
        playerParticipaing[msg.sender] = true;
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

    function random() public view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        players.length
                    )
                )
            );
    }

    function cleanPlayerParticipaing() public {}

    function pickWinner() public {
        require(msg.sender == manager, "GTO!");
        require(players.length >= 1, "Not enough player participaing");

        uint256 rand = random();
        address payable winner;
        uint256 index = rand % players.length;
        // return index;
        winner = players[index];
        winner.transfer(getContractBalance());
        players = new address payable[](0); //reset lottery
    }
}
