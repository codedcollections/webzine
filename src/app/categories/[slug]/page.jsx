import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export async function generateStaticParams() {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'categories/',
		content_type: 'category',
	});

	return data.stories.map((story) => ({
		slug: story.slug,
	}));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;

	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get(`cdn/stories/categories/${slug}`, {
		version: 'published',
	});

	const story = data.story;

	return {
		title: story.content.seo_title || `${story.content.title} – Artiklar`,
		description:
			story.content.seo_description ||
			`Läs alla artiklar i kategorin ${story.content.title}.`,
	};
}

export default async function CategoryPage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	const category = await storyblokApi.get(`cdn/stories/categories/${slug}`, {
		version: 'published',
	});
	const categoryTitle = category.data.story.content.title;

	const { data } = await storyblokApi.get('cdn/stories/category-page', {
		version: 'published',
	});

	return (
		<>
			<div className="max-w-3xl mx-auto px-4 pt-10">
				<h1 className="text-3xl font-bold text-slate-900">{categoryTitle}</h1>
			</div>
			<StoryblokServerComponent blok={data.story.content} slug={slug} />
		</>
	);
}
