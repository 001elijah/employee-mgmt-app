export const CONTRACT_ADDRESS = "0x935087DB07e86528941464946B0c431cbDC516D1";

export const CONTRACT_ABI = [
	{
		inputs: [],
		stateMutability: "nonpayable",
		type: "constructor",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "uint256",
				name: "electionID",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "string",
				name: "info",
				type: "string",
			},
		],
		name: "ElectionCreated",
		type: "event",
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: "address",
				name: "voter",
				type: "address",
			},
			{
				indexed: true,
				internalType: "uint256",
				name: "electionID",
				type: "uint256",
			},
			{
				indexed: false,
				internalType: "uint256",
				name: "candidateIndex",
				type: "uint256",
			},
		],
		name: "Voted",
		type: "event",
	},
	{
		inputs: [],
		name: "admin",
		outputs: [
			{
				internalType: "address",
				name: "",
				type: "address",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		name: "elections",
		outputs: [
			{
				internalType: "string",
				name: "info",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [],
		name: "testString",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_info",
				type: "string",
			},
			{
				internalType: "string[]",
				name: "_candidates",
				type: "string[]",
			},
		],
		name: "createElection",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_candidateIndex",
				type: "uint256",
			},
		],
		name: "vote",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_candidateIndex",
				type: "uint256",
			},
		],
		name: "getResult",
		outputs: [
			{
				internalType: "uint256",
				name: "",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
		],
		name: "getCandidates",
		outputs: [
			{
				internalType: "string[]",
				name: "",
				type: "string[]",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_data",
				type: "string",
			},
		],
		name: "setTestString",
		outputs: [],
		stateMutability: "nonpayable",
		type: "function",
	},
	{
		inputs: [],
		name: "getTestString",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
		type: "function",
		constant: true,
	},
];
