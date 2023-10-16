const VotingSystem = artifacts.require("VotingSystem");

contract("VotingSystem", (accounts) => {
	let instance;
	const admin = accounts[0];
	const voter1 = accounts[1];
	const voter2 = accounts[2];

	before(async () => {
		instance = await VotingSystem.deployed();
	});

	describe("Deployment", async () => {
		it("should deploy correctly and set the correct admin", async () => {
			const adminAddress = await instance.admin();
			assert.equal(adminAddress, admin, "Admin is not set correctly");
		});

		it("should start with zero elections", async () => {
			const electionCount = await instance.electionCount();
			assert.equal(
				electionCount.toNumber(),
				0,
				"Initial election count is not zero"
			);
		});
	});

	describe("Election Creation", async () => {
		it("should create an election", async () => {
			const candidates = ["Alice", "Bob"];
			// Use current block time and set the election to start a little earlier and end a bit later.
			const currentBlockTime = (await web3.eth.getBlock("latest")).timestamp;
			const startTime = currentBlockTime - 10; // start 10 seconds before current time
			const endTime = currentBlockTime + 300; // end in 5 minutes

			await instance.createElection(
				"Election 1",
				["Candidate 1", "Candidate 2"],
				startTime,
				endTime,
				{ from: admin }
			);

			const electionCount = await instance.electionCount();
			assert.equal(
				electionCount.toNumber(),
				1,
				"Election count is not correct"
			);
		});
	});

	describe("Voting Process", async () => {
		it("should allow a user to vote", async () => {
			await instance.vote(1, 0, { from: voter1 });
			const result = await instance.getResult(1, 0);
			assert.equal(
				result.toNumber(),
				1,
				"Vote count for candidate is incorrect"
			);
		});

		it("should not allow a user to vote twice", async () => {
			try {
				await instance.vote(1, 0, { from: voter1 });
			} catch (error) {
				assert(
					error.message.includes("Address has already voted."),
					"Error message not as expected"
				);
				return;
			}
			assert.fail("Expected error not received");
		});

		it("should allow another user to vote", async () => {
			await instance.vote(1, 1, { from: voter2 });
			const result = await instance.getResult(1, 1);
			assert.equal(
				result.toNumber(),
				1,
				"Vote count for candidate is incorrect"
			);
		});
	});

	describe("Election Details", async () => {
		it("should retrieve the correct election details", async () => {
			const details = await instance.getElection(1);
			assert.equal(details[0].toNumber(), 1, "Election ID is not correct");
			assert.equal(details[1], "Election 1", "Election info is not correct");
			assert.equal(
				details[2].toNumber(),
				2,
				"Election vote count is not correct"
			);
		});
	});

	describe("Permissions", async () => {
		it("should not allow non-admin to create an election", async () => {
			try {
				const candidates = ["Charlie", "Dave"];
				const futureDate = Math.floor(Date.now() / 1000) + 10; // Setting a closer start date to vote immediately
				const endDate = futureDate + 1000;

				await instance.createElection(
					"Election 2",
					candidates,
					futureDate,
					endDate,
					{ from: voter1 }
				);
				assert.fail("Expected error not received");
			} catch (error) {
				assert(
					error.message.includes("Only admin can call this function."),
					"Error message not as expected"
				);
			}
		});
	});
});
