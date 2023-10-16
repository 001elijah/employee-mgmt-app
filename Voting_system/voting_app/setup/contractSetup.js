import { getWeb3 } from "./web3Setup";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/config";

let contract;

export function initializeContract() {
	const web3 = getWeb3();
	contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
	return contract;
}

export function getContract() {
	return contract;
}
