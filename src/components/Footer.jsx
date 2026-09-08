import Image from 'next/image';
import { storyblokEditable } from '@storyblok/react/rsc';

export default function Footer({ blok }) {
	return (
		<footer {...storyblokEditable(blok)}>
			{blok.footerIcon?.filename && (
				<Image
					src={blok.footerIcon?.filename}
					alt="mail icon"
					width={45}
					height={45}
				/>
			)}
			<div>
				<h2 className="font-bold">{blok.footerHeadline}</h2>
				<p>{blok.footerText}</p>
			</div>
		</footer>
	);
}
