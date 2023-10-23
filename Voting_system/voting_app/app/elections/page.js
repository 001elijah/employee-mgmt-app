"use client";

import React, { useEffect, useState } from "react";
import ElectionCard from "@/components/ElectionCard";
import { getContract } from "@/setup/contractSetup";
import useMetamask from "@/hooks/useMetamask";

const Elections = () => {
	const [electionId, setElectionId] = useState("");
	const [electionInfo, setElectionInfo] = useState(null);
	const { web3 } = useMetamask();

	const handleGetElectionInfo = async () => {
		const contract = getContract();

		try {
			const info = await contract.methods.getElectionInfo(electionId).call();
			const candidates = await contract.methods
				.getCandidates(electionId)
				.call();
			const election = await contract.methods.elections(electionId).call();

			setElectionInfo({
				info,
				candidates,
				startDate: election.startDate,
				endDate: election.endDate,
			});
		} catch (error) {
			console.error("Failed to get election info:", error);
			alert("Failed to get election info. Check the console for details.");
		}
	};

	return (
		<div>
			<div className='mb-4'>
				<label className='block text-sm font-medium text-gray-600 mb-1'>
					Val ID
				</label>
				<input
					type='text'
					value={electionId}
					onChange={(e) => setElectionId(e.target.value)}
					className='w-full p-2 border rounded-lg'
				/>
			</div>
			<button
				onClick={handleGetElectionInfo}
				className='px-4 py-2 bg-indigo-600 text-white rounded-lg'>
				Hämta valinformation
			</button>

			{electionInfo && (
				<div className='mt-4 bg-white p-4 rounded-lg shadow-md'>
					<h3 className='text-xl font-semibold mb-2 text-indigo-600'>
						{electionInfo.info}
					</h3>
					<div className='flex mb-4'>
						<div className='mr-4'>
							<span className='text-indigo-600 font-medium'>Starttid: </span>
							<span className='text-gray-600'>{electionInfo.startDate}</span>
						</div>
						<div>
							<span className='text-indigo-600 font-medium'>Sluttid: </span>
							<span className='text-gray-600'>{electionInfo.endDate}</span>
						</div>
					</div>
					<div className='border-t pt-2'>
						<h4 className='text-indigo-600 font-medium mb-2'>Kandidater:</h4>
						<div className='flex flex-wrap gap-2'>
							{electionInfo.candidates.map((candidate, index) => (
								<div
									key={index}
									className='mb-1 text-gray-600 border p-2 rounded-lg'>
									{candidate}
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Elections;
