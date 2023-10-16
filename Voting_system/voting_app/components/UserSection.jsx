"use client";

import React, { useState } from "react";
import { getContract } from "@/setup/contractSetup";
import useMetamask from "@/hooks/useMetamask";

function UserSection() {
	const [electionID, setElectionID] = useState("");
	const [candidateIndex, setCandidateIndex] = useState("");
	const [results, setResults] = useState({});

	const handleVote = async () => {
		const contract = getContract();
		const accounts = await window.web3.eth.getAccounts();

		try {
			await contract.methods
				.vote(electionID, candidateIndex)
				.send({ from: accounts[0] });
			alert("Voted successfully!");
		} catch (error) {
			console.error("Failed to vote:", error);
			alert("Failed to vote. Check the console for details.");
		}
	};

	const handleGetResults = async () => {
		const contract = getContract();

		try {
			const result = await contract.methods
				.getResult(electionID, candidateIndex)
				.call();
			setResults((prev) => ({ ...prev, [candidateIndex]: result }));
		} catch (error) {
			console.error("Failed to get results:", error);
			alert("Failed to get results. Check the console for details.");
		}
	};

	return (
		<div>
			<h2>User Section</h2>
			<input
				type='number'
				placeholder='Election ID'
				value={electionID}
				onChange={(e) => setElectionID(e.target.value)}
			/>
			<input
				type='number'
				placeholder='Candidate Index'
				value={candidateIndex}
				onChange={(e) => setCandidateIndex(e.target.value)}
			/>
			<button onClick={handleVote}>Vote</button>
			<button onClick={handleGetResults}>Get Results</button>
			<div>Results: {JSON.stringify(results)}</div>
		</div>
	);
}

export default UserSection;
