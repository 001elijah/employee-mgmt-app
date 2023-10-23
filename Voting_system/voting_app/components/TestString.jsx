"use client";

import React, { useState } from "react";
import { getContract } from "@/setup/contractSetup";
import useMetamask from "@/hooks/useMetamask";

function TestString() {
	const [testString, setTestString] = useState("");
	const [currentTestString, setCurrentTestString] = useState("");
	const { web3 } = useMetamask();

	const handleSetTestString = async () => {
		const contract = getContract();
		const accounts = await web3.eth.getAccounts();

		try {
			await contract.methods
				.setTestString(testString)
				.send({ from: accounts[0] });
			console.log("wow", testString);
			alert("Test string set successfully!");
		} catch (error) {
			console.error("Failed to set test string:", error);
			alert("Failed to set test string. Check the console for details.");
		}
	};

	const getTestString = async () => {
		const contract = getContract();
		console.log(contract);

		try {
			const string = await contract.methods.getTestString(testString).call();
			console.log("wow", testString);
			setCurrentTestString(string);
		} catch (error) {
			console.error("Failed to get test string:", error);
			alert("Failed to get test string. Check the console for details.");
		}
	};

	return (
		<div>
			<input
				type='text'
				value={testString}
				onChange={(e) => setTestString(e.target.value)}
			/>
			<button onClick={handleSetTestString}>Set Test String</button>

			<h2>Current Test String: {currentTestString}</h2>
			<button onClick={getTestString}>Get Test String</button>
			<h2>{currentTestString}</h2>
		</div>
	);
}

export default TestString;
