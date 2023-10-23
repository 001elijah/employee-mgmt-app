import { getContract } from "@/setup/contractSetup";
import React, { useEffect } from "react";

const ElectionCard = ({
	electionName,
	description,
	startTime,
	endTime,
	candidates,
}) => {
	const getElectionData = async () => {
		const contract = getContract();

		try {
			const data = await contract.methods.getElection().call();
			return {
				electionName: data.electionName,
				description: data.description,
				startTime: new Date(data.startTime * 1000).toLocaleString(),
				endTime: new Date(data.endTime * 1000).toLocaleString(),
				candidates: data.candidates,
			};
		} catch (error) {
			console.error("Failed to get election data:", error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await getElectionData();
			console.log(data);
		};
		fetchData();
	}, []);

	const handleVote = (candidate) => {
		// Här kan du lägga till logiken för att rösta på en kandidat
		alert("Röstar på: ", candidate);
	};

	return (
		<div className='border p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300'>
			<h3 className='text-xl font-semibold mb-2 text-indigo-600'>
				{electionName}
			</h3>
			<p className='text-sm text-gray-600 mb-4'>{description}</p>
			<div className='flex mb-4'>
				<div className='mr-4'>
					<span className='text-indigo-600 font-medium'>Starttid: </span>
					<span className='text-gray-600'>{startTime}</span>
				</div>
				<div>
					<span className='text-indigo-600 font-medium'>Sluttid: </span>
					<span className='text-gray-600'>{endTime}</span>
				</div>
			</div>
			<div className='border-t pt-2'>
				<h4 className='text-indigo-600 font-medium mb-2'>Kandidater:</h4>
				<div className='flex flex-wrap gap-2'>
					{candidates.map((candidate, index) => (
						<button
							key={index}
							onClick={() => handleVote(candidate)}
							className='mb-1 text-gray-600 border p-2 rounded-lg hover:bg-indigo-600 hover:text-white transition duration-300 focus:outline-none'>
							{candidate}
						</button>
					))}
				</div>
			</div>
		</div>
	);
};

export default ElectionCard;
