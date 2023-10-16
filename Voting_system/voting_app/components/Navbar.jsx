"use client";

import Link from "next/link";
import Image from "next/image";

const Nav = () => {
	return (
		<nav className='flex justify-between items-center h-24 px-8 w-full'>
			<div className='flex items-center space-x-4'>
				<Link href='/'>
					<Image
						className='rounded-full'
						src='/assets/images/home.png'
						alt='logo'
						width={75}
						height={75}
					/>
				</Link>
			</div>

			<h1 className='text-6xl text-sky-600 font-bold'>How it works</h1>

			<div className='flex items-center space-x-4'>
				<Link href='/testing'>
					<p className='text-gray-600 hover:text-gray-900'>testing</p>
				</Link>
			</div>
			<div className='flex items-center space-x-4'>
				<Link href='/admin'>
					<p className='text-gray-600 hover:text-gray-900'>admin</p>
				</Link>
			</div>
		</nav>
	);
};

export default Nav;
