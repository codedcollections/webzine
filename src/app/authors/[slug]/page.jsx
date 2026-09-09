import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'authors/',
		content_type: 'author',
	});

	return data.stories.map((story) => ({
		slug: story.slug,
	}));
}

export async function generateMetadata({ params }) {
	const { slug } = await params;
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.get(`cdn/stories/authors/${slug}`, {
		version: 'published',
	});

	const story = data.story;
	return {
		title: story.content.name,
		description: story.content.bio,
	};
}

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
