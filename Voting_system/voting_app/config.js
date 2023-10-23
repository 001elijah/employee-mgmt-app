export const CONTRACT_ADDRESS = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

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
	},
	{
		inputs: [
			{
				internalType: "string",
				name: "_info",
				type: "string",
			},
			{
				internalType: "uint256",
				name: "_startDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "_endDate",
				type: "uint256",
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
			{
				internalType: "uint256",
				name: "startDate",
				type: "uint256",
			},
			{
				internalType: "uint256",
				name: "endDate",
				type: "uint256",
			},
		],
		stateMutability: "view",
		type: "function",
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
	},
	{
		inputs: [
			{
				internalType: "uint256",
				name: "_electionId",
				type: "uint256",
			},
		],
		name: "getElectionInfo",
		outputs: [
			{
				internalType: "string",
				name: "",
				type: "string",
			},
		],
		stateMutability: "view",
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
];
