import { getStoryblokApi } from '@/lib/storyblok';
import { getCategoryStyle } from '@/lib/categoryStyles';
import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';

export default async function ArticleList({ blok }) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'articles/',
		content_type: 'article',
		resolve_relations: 'article.author',
	});

	const stories = data.stories;

	return (
		<section
			{...storyblokEditable(blok)}
			className="max-w-3xl mx-auto px-4 py-10"
		>
			{blok.heading && (
				<h2 className="text-2xl font-bold text-gray-900 mb-3">
					{blok.heading}
				</h2>
			)}
			<div className="w-10 h-1 bg-blue-600 rounded-full mb-6" />

			{stories.length === 0 ? (
				<p className="text-gray-500">
					{blok.empty_text || 'Inga artiklar ännu.'}
				</p>
			) : (
				<ul className="divide-y divide-gray-100">
					{stories.map((story) => {
						const author = story.content.author?.[0];

						return (
							<li key={story.uuid} className="py-6 first:pt-0">
								<Link href={`/${story.full_slug}`} className="flex gap-4 group">
									<div className="flex-1 min-w-0">
										<span
											className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${getCategoryStyle(story.content.category)}`}
										>
											{story.content.category?.toUpperCase()}
										</span>

										<h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
											{story.content.title}
										</h3>

										<div className="flex items-center gap-4 text-sm text-gray-500 mt-2 mb-3">
											{story.published_at && (
												<span className="flex items-center gap-1">
													📅{' '}
													{new Date(story.published_at).toLocaleDateString(
														'sv-SE',
													)}
												</span>
											)}

											{author?.content?.name && (
												<span className="flex items-center gap-1">
													👤 {author.content.name}
												</span>
											)}
										</div>

										{story.content.summary && (
											<p className="text-gray-600 text-sm line-clamp-2">
												{story.content.summary}
											</p>
										)}
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			)}
		</section>
	);
}
