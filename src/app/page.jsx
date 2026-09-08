import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokStory } from '@storyblok/react/rsc';

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
