import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

const CategoryList = ({ blok }) => (
	<div {...storyblokEditable(blok)} className="max-w-3xl mx-auto px-4 py-10">
		{blok.headline && (
			<h2 className="text-2xl font-bold text-gray-900 mb-3">{blok.headline}</h2>
		)}
		
		<div className="w-10 h-1 bg-blue-600 rounded-full mb-6" />

		<ul className="divide-y divide-gray-100">
			{blok.categories?.map((nestedBlok) => (
				<StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
			))}
		</ul>
	</div>
);

export default CategoryList;
