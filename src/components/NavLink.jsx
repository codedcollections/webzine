import { storyblokEditable } from '@storyblok/react/rsc';

export default function NavLink({ blok }) {
	const url = blok.link?.url ? blok.link?.url : blok.link?.cached_url;

	return (
		<li {...storyblokEditable(blok)}>
			<a
				className="uppercase relative hover:text-blue-400 after:absolute after:-bottom-5 after:left-0 after:h-0.5 after:w-full after:bg-blue-400 after:opacity-0 hover:after:opacity-100"
				href={url}
			>
				{blok.label}
			</a>
		</li>
	);
}
