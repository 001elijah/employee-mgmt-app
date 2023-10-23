const { ethers } = require("hardhat");
const { expect } = require("chai");
const { time } = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("VotingSystem", function () {
	let votingSystem;
	let admin;
	let voter1;

	beforeEach(async function () {
		[admin, voter1] = await ethers.getSigners();

		const VotingSystem = await ethers.getContractFactory("VotingSystem");
		votingSystem = await VotingSystem.deploy();
	});

	describe("Deployment", function () {
		it("Should set the right admin", async function () {
			expect(await votingSystem.admin()).to.equal(admin.address);
		});
	});

	describe("Election", function () {
		it("Should create an election", async function () {
			const currentTime = await time.latest();
			const startDate = currentTime + 60;
			const endDate = currentTime + 3600;
			await votingSystem.createElection("Election 1", startDate, endDate, [
				"Candidate 1",
				"Candidate 2",
			]);
			const electionInfo = await votingSystem.getElectionInfo(0);
			expect(electionInfo).to.equal("Election 1");
		});

		it("Should allow voting", async function () {
			const currentTime = await time.latest();
			const startDate = currentTime + 60;
			const endDate = currentTime + 3600;
			await votingSystem.createElection("Election 1", startDate, endDate, [
				"Candidate 1",
				"Candidate 2",
			]);
			await time.increase(61);
			await votingSystem.connect(voter1).vote(0, 0);
			const result = await votingSystem.getResult(0, 0);
			expect(result).to.equal(1);
		});

		it("Should fail if voting for a non-existing candidate", async function () {
			const currentTime = await time.latest();
			const startDate = currentTime + 60;
			const endDate = currentTime + 3600;
			await votingSystem.createElection("Election 1", startDate, endDate, [
				"Candidate 1",
				"Candidate 2",
			]);
			await time.increase(61);

			await expect(votingSystem.connect(voter1).vote(0, 2)).to.be.revertedWith(
				"Invalid candidate index."
			);
		});

		it("Should fail if voting more than once", async function () {
			const currentTime = await time.latest();
			const startDate = currentTime + 60;
			const endDate = currentTime + 3600;
			await votingSystem.createElection("Election 1", startDate, endDate, [
				"Candidate 1",
				"Candidate 2",
			]);
			await time.increase(61);
			await votingSystem.connect(voter1).vote(0, 0);
			await expect(votingSystem.connect(voter1).vote(0, 1)).to.be.revertedWith(
				"Address has already voted."
			);
		});

		it("Should fail if voting after end date", async function () {
			const currentTime = await time.latest();
			const startDate = currentTime + 60;
			const endDate = currentTime + 3600;
			await votingSystem.createElection("Election 1", startDate, endDate, [
				"Candidate 1",
				"Candidate 2",
			]);
			await time.increase(4000);

			await expect(votingSystem.connect(voter1).vote(0, 0)).to.be.revertedWith(
				"Voting has ended."
			);
		});
	});
});
