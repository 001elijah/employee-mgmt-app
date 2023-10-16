"use client";

import React, { useState } from "react";
import { getContract } from "@/setup/contractSetup";
import useMetamask from "@/hooks/useMetamask";

function AdminSection() {
	const [electionInfo, setElectionInfo] = useState("");
	const [candidates, setCandidates] = useState("");
	const { accounts, web3 } = useMetamask();

	const handleCreateElection = async () => {
		const contract = getContract();
		const accounts = await web3.eth.getAccounts();

		const candidatesArray = candidates.split(",");

		try {
			await contract.methods
				.createElection(
					electionInfo,
					candidatesArray,
					Date.now() + 3600,
					Date.now() + 7200
				)
				.send({ from: accounts[0] });
			alert("Election created successfully!");
		} catch (error) {
			console.error("Failed to create the election:", error);
			alert("Failed to create the election. Check the console for details.");
		}
	};

	return (
		<div>
			<h2>Admin Section</h2>
			<input
				type='text'
				placeholder='Election Info'
				value={electionInfo}
				onChange={(e) => setElectionInfo(e.target.value)}
			/>
			<input
				type='text'
				placeholder='Candidate1,Candidate2,...'
				value={candidates}
				onChange={(e) => setCandidates(e.target.value)}
			/>
			<button onClick={handleCreateElection}>Create Election</button>
		</div>
	);
}

export default AdminSection;
