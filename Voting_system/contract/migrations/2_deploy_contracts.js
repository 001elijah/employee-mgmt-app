const VotingSystem = artifacts.require("../contracts/VotingSystem.sol");

module.exports = function (deployer) {
	deployer.deploy(VotingSystem);
};
