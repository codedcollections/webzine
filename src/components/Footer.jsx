import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react/rsc';

export default function Footer({ blok }) {
	return (
		<footer
			className="px-4 py-6 mt-5 mb-2 rounded-lg flex justify-between bg-linear-to-r from-blue-100/70 to-pink-100/70"
			{...storyblokEditable(blok)}
		>
			<div className="flex gap-2 items-center">
				{blok.footerIcon?.filename && (
					<div className="flex h-11.25 w-11.25 items-center justify-center rounded-full bg-blue-400">
						<Image
							src={blok.footerIcon?.filename}
							alt="mail icon"
							width={24}
							height={24}
							className="brightness-0 invert"
						/>
					</div>
				)}
				<div>
					<h2 className="font-bold text-xl">{blok.footerHeadline}</h2>
					<p>{blok.footerText}</p>
				</div>
			</div>
			<div className="flex gap-3">
				<input
					type="text"
					name={blok.footerPlaceholder}
					id=""
					placeholder={blok.footerPlaceholder}
					className=" rounded-md bg-white px-4 py-3 text-gray-800 shadow-sm outline-none placeholder:text-gray-300 focus:ring-2 focus:ring-pink-100"
				/>
				<button className="rounded-md bg-blue-400 px-6 py-3 text-white font-medium hover:bg-pink-600 transition-colors">
					{blok.footerButton}
				</button>
			</div>
		</footer>
	);
}
