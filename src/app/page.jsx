import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get(`cdn/stories/home`, {
		version: 'published',
	});

	const story = data.story;
	return {
		title: story.content.seo_title,
		description: story.content.seo_description,
	};
}

export default async function HomePage() {
	let story;

	try {
		const storyblokApi = getStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/home', {
			version: 'published',
		});
		story = data.story;
	} catch {
		notFound();
	}

	return <StoryblokStory story={story} />;
}
