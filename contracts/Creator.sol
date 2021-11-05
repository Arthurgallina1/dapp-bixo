// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract FirstContract {
    address public ownerA;

    // externally owned account
    constructor(address eoa) {
        ownerA = eoa;
    }
}

contract Creator {
    address public ownerCreator;
    FirstContract[] public deployedFirstContract;

    constructor() {
        ownerCreator = msg.sender;
    }

    function deployA() public {
        // a intance of FirstContract so deploys another contract
        // This way the owner would be this contract address and not the user calling it
        // FirstContract newAAdress = new FirstContract();

        FirstContract newAAdress = new FirstContract(msg.sender);

        deployedFirstContract.push(newAAdress);
    }
}
