import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Header({ blok }) {
	return (
		<header
			className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 flex items-stretch justify-between h-20"
			{...storyblokEditable(blok)}
		>
			<h2 className="text-3xl font-bold tracking-tight text-gray-900 capitalize self-center">
				{blok.headerTitle}
			</h2>
			<nav className="flex h-full">
				<ul className="flex items-stretch gap-8 h-full">
					{blok.navigation?.map((navBlok) => (
						<StoryblokServerComponent blok={navBlok} key={navBlok._uid} />
					))}
				</ul>
			</nav>
		</header>
	);
}
