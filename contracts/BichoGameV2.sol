// SPDX-License-Identifier: MIT
pragma solidity >=0.7.1 <0.9.0;

contract BichoGameV2 {
    struct Player {
        address payable addr;
        uint256 animal;
        bool playing;
    }

    uint256[] public animals = [0, 1, 2, 3, 4, 5];
    mapping(address => Player) public whosPlaying;
    Player[] public players;

    receive() external payable {
        Player memory newPlayer;
        newPlayer.addr = payable(msg.sender);
        newPlayer.animal = players.length;
        newPlayer.playing = true;

        // require(whosPlaying[msg.sender].playing != true, 'Already playing!');
        players.push(newPlayer);
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

    function pickWinner() public {
        require(players.length >= 1, "Not enough player participaing");

        uint256 rand = random();
        // address payable winner;
        Player memory winner;
        uint256 index = rand % players.length;
        // return index;
        winner = players[index];
        winner.addr.transfer(getContractBalance());

        //players = new Player[](0);  // this doesnt work because players is storage and new Player[](0) is in memory.
        delete players;
    }
}
