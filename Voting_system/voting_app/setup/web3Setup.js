import Web3 from "web3";

let web3;

export function initializeWeb3(provider) {
	web3 = new Web3(provider || Web3.givenProvider || "ws://localhost:7545");
	return web3;
}

export function getWeb3() {
	return web3;
}
