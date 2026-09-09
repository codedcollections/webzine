import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const Grid = ({ blok }) => (
	<div
		{...storyblokEditable(blok)}
		className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1fr_320px] gap-12 items-start"
	>
		{blok.columns.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</div>
);

export default Grid;
