function ConnectedAccounts({ accounts }) {
	return (
		<div className='bg-gray-100 p-2 rounded mt-4 absolute text-black  left-50 top-0'>
			<strong>Connected Accounts:</strong>
			<ul>
				{accounts.map((account, index) => (
					<li key={index}>{account}</li>
				))}
			</ul>
		</div>
	);
}

export default ConnectedAccounts;
