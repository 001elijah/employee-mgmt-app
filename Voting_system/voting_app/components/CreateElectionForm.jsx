"use client";

import React, { useState } from "react";
import { getContract } from "@/setup/contractSetup";
import useMetamask from "@/hooks/useMetamask";

const CreateElectionForm = () => {
	const [electionName, setElectionName] = useState("");
	const [description, setDescription] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");
	const [candidates, setCandidates] = useState("");
	const [message, setMessage] = useState("");

	const { web3 } = useMetamask();

	const handleCreateElection = async () => {
		const contract = getContract();
		const accounts = await web3.eth.getAccounts();

		const startDate = new Date(startTime).getTime() / 1000; // Konvertera till Unix-tidstämpel
		const endDate = new Date(endTime).getTime() / 1000; // Konvertera till Unix-tidstämpel

		try {
			await contract.methods
				.createElection(
					description, // Info
					startDate, // Startdatum
					endDate, // Slutdatum
					candidates.split(",") // Kandidater
				)
				.send({ from: accounts[0] });
			setMessage("Val skapat!");

			// Rensa formuläret
			setElectionName("");
			setDescription("");
			setStartTime("");
			setEndTime("");
			setCandidates("");
		} catch (error) {
			console.error("Failed to create election:", error);
			setMessage(
				"Misslyckades med att skapa valet. Kontrollera konsolen för detaljer."
			);
		}
	};

	return (
		<div className='bg-white p-4 rounded-lg shadow-md'>
			<h3 className='text-xl font-semibold mb-4'>Skapa val</h3>
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-600 mb-1'>
					Valnamn
				</label>
				<input
					type='text'
					value={electionName}
					onChange={(e) => setElectionName(e.target.value)}
					className='w-full p-2 border rounded-lg'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-600 mb-1'>
					Beskrivning
				</label>
				<textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					className='w-full p-2 border rounded-lg'
				/>
			</div>
			<div className='flex mb-4 gap-4'>
				<div className='flex-1'>
					<label className='block text-sm font-medium text-gray-600 mb-1'>
						Starttid
					</label>
					<input
						type='text'
						value={startTime}
						onChange={(e) => setStartTime(e.target.value)}
						className='w-full p-2 border rounded-lg'
					/>
				</div>
				<div className='flex-1'>
					<label className='block text-sm font-medium text-gray-600 mb-1'>
						Sluttid
					</label>
					<input
						type='text'
						value={endTime}
						onChange={(e) => setEndTime(e.target.value)}
						className='w-full p-2 border rounded-lg'
					/>
				</div>
			</div>
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-600 mb-1'>
					Kandidater (kommaseparerade)
				</label>
				<input
					type='text'
					value={candidates}
					onChange={(e) => setCandidates(e.target.value)}
					className='w-full p-2 border rounded-lg'
				/>
			</div>
			<button
				onClick={handleCreateElection}
				className='px-4 py-2 bg-indigo-600 text-white rounded-lg'>
				Skapa val
			</button>
			{message && <div className='mt-4 text-green-600'>{message}</div>}
		</div>
	);
};

export default CreateElectionForm;
