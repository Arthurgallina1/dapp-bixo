var BichoGame = artifacts.require("./BichoGame.sol");

module.exports = function(deployer) {
  deployer.deploy(BichoGame);
};
