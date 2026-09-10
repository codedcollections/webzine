import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react/rsc';

export default function Footer({ blok }) {
	return (
		<footer
			{...storyblokEditable(blok)}
			className="max-w-3xl mx-auto px-4 py-8 mt-10 mb-2 rounded-lg flex justify-between items-center bg-linear-to-r from-blue-50/60 to-pink-100/70 border-gray-100"
		>
			<div className="flex gap-3 items-center">
				{blok.footerIcon?.filename && (
					<div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600">
						<Image
							src={blok.footerIcon?.filename}
							alt="mail icon"
							width={20}
							height={20}
							className="brightness-0 invert"
						/>
					</div>
				)}

				<div>
					<h2 className="font-bold text-lg text-gray-900">{blok.footerHeadline}</h2>
					<p className='text-sm text-gray-600'>{blok.footerText}</p>
				</div>
			</div>

			<div className="flex gap-3">
				<input
					type="email"
					name="email"
					placeholder={blok.footerPlaceholder}
					className="rounded-md bg-white border border-gray-200 px-4 py-2.5 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-pink-100"
				/>

				<button className="rounded-md bg-blue-600 px-5 py-2.5 text-sm text-white font-medium hover:bg-pink-600 transition-colors">
					{blok.footerButton}
				</button>
			</div>
		</footer>
	);
}