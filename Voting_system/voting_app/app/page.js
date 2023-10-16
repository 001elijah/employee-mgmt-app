"use client";

import LinkCard from "../components/LinkCard";
import useMetamask from "@/hooks/useMetamask";
import ConnectedAccounts from "@/components/ConnectedAccount";

export default function Home() {
	const { isMetamaskInstalled, accounts, connectMetamask } = useMetamask();

	if (!isMetamaskInstalled) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<h1 className='text-2xl mb-4'>Welcome to E-voting System</h1>
				<p>Please install MetaMask to proceed!</p>
			</div>
		);
	}
	if (accounts.length === 0) {
		return (
			<div className='flex flex-col items-center justify-center min-h-screen'>
				<h1 className='text-2xl mb-4'>Welcome to E-voting System</h1>
				<p>Please connect your MetaMask account to proceed.</p>
				<button
					className=''
					onClick={connectMetamask}>
					Connect MetaMask
				</button>
			</div>
		);
	}

	return (
		<section className='relative flex flex-col items-center justify-center p-7'>
			<ConnectedAccounts accounts={accounts} />
			<div
				className='w-full h-[50vh] bg-cover rounded-[6rem] shadow-xl '
				style={{
					backgroundImage: "url('/assets/images/blockchain-background.jpg')",
					backgroundSize: "contain",
					backgroundPosition: "center",
				}}></div>

			<div className='w-full grid lg:grid-cols-3 md:grid-cols-3 gap-10 mt-10'>
				<LinkCard
					title='Sign Up'
					description='Welcome to the E-voting System, please sign up to continue'
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					imageSrc='/assets/images/signup.png'
				/>
				<LinkCard
					title='Vote'
					description='Cast your vote for your favorite candidate in the elections'
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					imageSrc='/assets/images/vote.png'
				/>
				<LinkCard
					title='Confirm'
					description='Confirm your vote to make sure it is counted, and view the results'
					href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app'
					imageSrc='/assets/images/confirm.png'
				/>
			</div>
		</section>
	);
}
