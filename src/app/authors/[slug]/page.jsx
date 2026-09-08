import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export default async function AuthorPage({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	let story;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/authors/${slug}`, {
			version: 'published',
		});
		story = data.story;
	} catch {
		notFound();
	}

	return (
		<StoryblokServerComponent
			blok={{
				...story.content,
				storyUuid: story.uuid,
			}}
		/>
	);
}
