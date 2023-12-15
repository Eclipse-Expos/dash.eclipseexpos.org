import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center justify-center bg-black p-6'>
			<div className='flex flex-col items-center justify-center bg-gray-800 text-white shadow-lg rounded-lg p-8'>
				<h1 className='text-3xl font-bold mb-4'>
					Welcome to Eclipse Expos
				</h1>
				<p className='text-gray-300 mb-6'>
					You're currently logged out. Please log in to access the
					dashboard.
				</p>
				<Link
					href='/signin'
					className='inline-block bg-blue-600 hover:bg-purple-700 py-2 px-4 rounded transition duration-300'
				>
					Log in
				</Link>
			</div>
		</main>
	);
}
