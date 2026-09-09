import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const Grid = ({ blok }) => (
	<div {...storyblokEditable(blok)} className="grid grid-cols-[60%_1fr] gap-20">
		{blok.columns.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</div>
);

export default Grid;
