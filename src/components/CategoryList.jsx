import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const CategoryList = ({ blok }) => (
	<div className=" py-10" {...storyblokEditable(blok)}>
		<h2 className="m-0 mb-6 text-xl font-bold text-slate-900">
			{blok.headline}
		</h2>
		{blok.categories.map((nestedBlok) => (
			<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
		))}
	</div>
);

export default CategoryList;
