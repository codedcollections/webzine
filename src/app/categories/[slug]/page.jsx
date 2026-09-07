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
		title: story.content.title,
		description: `Artiklar inom kategorin ${story.content.title}`,
	};
}

export default async function CategoryPage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get('cdn/stories/category-page', {
		version: 'published',
	});

	return <StoryblokServerComponent blok={data.story.content} slug={slug} />;
}
