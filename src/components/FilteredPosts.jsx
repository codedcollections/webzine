import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { getCategoryStyle } from '@/lib/categoryStyles';
import Link from 'next/link';

export default async function FilteredPosts({ blok, slug }) {
	const storyblokApi = getStoryblokApi();

	const { data } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'articles/',
		content_type: 'article',
		resolve_relations: 'article.author',
		filter_query: {
			category: { in: slug },
		},
	});

	const posts = data.stories;

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

			{posts.length === 0 ? (
				<p className="text-gray-500">
					{blok.empty_text || 'Inga artiklar ännu.'}
				</p>
			) : (
				<ul className="divide-y divide-gray-100">
					{posts.map((post) => {
						const author = post.content.author?.[0];

						return (
							<li key={post.uuid} className="py-6 first:pt-0">
								<Link href={`/${post.full_slug}`} className="flex gap-4 group">
									<div className="flex-1 min-w-0">
										<span
											className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${getCategoryStyle(post.content.category)}`}
										>
											{post.content.category?.toUpperCase()}
										</span>

										<h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
											{post.content.title}
										</h3>

										<div className="flex items-center gap-4 text-sm text-gray-500 mt-2 mb-3">
											{post.published_at && (
												<span className="flex items-center gap-1">
													📅{' '}
													{new Date(post.published_at).toLocaleDateString(
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

										{post.content.summary && (
											<p className="text-gray-600 text-sm line-clamp-2">
												{post.content.summary}
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
