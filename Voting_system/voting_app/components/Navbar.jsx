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
			<div className='flex items-center space-x-4 text-2xl font-semibold '>
				<div className=''>
					<Link href='/testing'>
						<p className='text-gray-600 hover:text-gray-900'>Testing</p>
					</Link>
				</div>
				<div className='flex items-center space-x-4'>
					<Link href='/admin'>
						<p className='text-gray-600 hover:text-gray-900'>Admin</p>
					</Link>
				</div>
				<div className='flex items-center space-x-4'>
					<Link href='/elections'>
						<p className='text-gray-600 hover:text-gray-900'>Elections</p>
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
