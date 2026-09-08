import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

export default function Header({ blok }) {
	return (
		<header {...storyblokEditable(blok)}>
			<h2>{blok.headerTitle}</h2>
			<nav>
				<ul>
					{blok.navigation?.map((navBlok) => (
						<StoryblokServerComponent blok={navBlok} key={navBlok._uid} />
					))}
				</ul>
			</nav>
		</header>
	);
}
