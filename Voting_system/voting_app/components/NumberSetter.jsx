import React, { useState } from "react";
import { getContract } from "@/setup/contractSetup";
import useMetamask from "@/hooks/useMetamask";

function NumberSetter() {
	const [number, setNumber] = useState(0);
	const [currentNumber, setCurrentNumber] = useState(null);
	const { accounts, web3 } = useMetamask();

	const handleSetNumber = async () => {
		const contract = getContract();

		if (!contract) return;

		try {
			await contract.methods.setNumber(number).send({ from: accounts[0] });
			handleGetNumber();
		} catch (err) {
			console.error("Error setting the number:", err);
		}
	};

	const handleGetNumber = async () => {
		const contract = getContract();

		if (!contract) return;

		try {
			const result = await contract.methods.getNumber().call();
			setCurrentNumber(result);
		} catch (err) {
			console.error("Error getting the number:", err);
		}
	};

	return (
		<div>
			<input
				type='number'
				value={number}
				onChange={(e) => setNumber(Number(e.target.value))}
			/>
			<button onClick={handleSetNumber}>Set Number</button>

			<h2>Current Number: {currentNumber}</h2>
		</div>
	);
}

export default NumberSetter;
