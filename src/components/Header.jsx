import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Header({ blok }) {
	return (
		<header
			className="pt-1 flex justify-between px-4"
			{...storyblokEditable(blok)}
		>
			<h2 className="text-3xl font-bold uppercase capitalize">
				{blok.headerTitle}
			</h2>
			<nav className="flex items-center">
				<ul className="flex gap-4">
					{blok.navigation?.map((navBlok) => (
						<StoryblokServerComponent blok={navBlok} key={navBlok._uid} />
					))}
				</ul>
			</nav>
		</header>
	);
}
