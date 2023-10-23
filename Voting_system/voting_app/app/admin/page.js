import CreateElectionForm from "@/components/CreateElectionForm";
import React from "react";

const admin = () => {
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-3xl font-bold mb-6'>Admin</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				<CreateElectionForm />
			</div>
		</div>
	);
};

export default admin;
