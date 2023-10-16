import React from "react";
import Image from "next/image";

const LinkCard = ({ title, description, href, imageSrc }) => {
	return (
		<div className='px-8 py-6 border-r-2  flex flex-col items-center min-h-[250px] shadow-xl rounded-xl '>
			{imageSrc && (
				<div className='mb-4 flex items-center justify-center'>
					<Image
						className='rounded-full'
						src={imageSrc}
						alt={title}
						width={75}
						height={100}
					/>
				</div>
			)}
			<h2 className='mb-3 text-3xl font-semibold text-sky-700'>{title}</h2>
			<p className='m-0 max-w-[30ch] text-lg opacity-50 mb-4 text-center text-sky-600 '>
				{description}
			</p>
			{/* <button className='bg-sky-300 text-2xl font-semibold rounded-lg m-auto px-4 py-1 mt-auto'>
				{title}
			</button> */}
		</div>
	);
};

export default LinkCard;
