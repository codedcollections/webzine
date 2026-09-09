import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const Grid = ({ blok }) => (
	<div {...storyblokEditable(blok)} className="grid grid-cols-[3fr_2fr] gap-6">
		{blok.columns.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</div>
);

export default Grid;
