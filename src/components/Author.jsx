import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import Link from 'next/link';

export default async function Author({ blok }) {
	const storyblokApi = getStoryblokApi();

	const { data: articlesData } = await storyblokApi.getStories({
		version: 'published',
		starts_with: 'articles/',
		content_type: 'article',
		filter_query: {
			author: {
				in: blok.storyUuid,
			},
		},
	});

	const articles = articlesData.stories;

	return (
		<article
			{...storyblokEditable(blok)}
			className="max-w-3xl mx-auto px-4 py-12"
		>
			<div className="grid grid-cols-2 place-items-center gap-6 mb-12 pb-10 border-b border-gray-100">
				<div className="flex flex-col items-center gap-3">
					<h2 className="flex text-2xl font-bold text-gray-900">{blok.name}</h2>
					<p className="flex text-center text-gray-600 leading-relaxed">
						{blok.bio}
					</p>
				</div>

				{blok.photo?.filename && (
					<img
						className="rounded-md shadow-[0_6px_20px_rgba(0,0,0,0.12)]"
						src={blok.photo.filename}
						alt={blok.name}
						width={200}
						height={150}
					/>
				)}
			</div>

			<h2 className="flex text-3xl font-bold text-gray-900 mb-6">
				Inlägg av {blok.name}
			</h2>

			{articles.length === 0 ? (
				<p className="text-gray-500">Inga inlägg ännu.</p>
			) : (
				<ul className="flex flex-col gap-4 mb-8 divide-y divide-gray-100">
					{articles.map((article) => (
						<li key={article.uuid} className="pt-4 first:pt-0">
							<Link
								href={`/${article.full_slug}`}
								className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
							>
								{article.content.title}
							</Link>
						</li>
					))}
				</ul>
			)}

			<p>
				<Link
					href="/"
					className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
				>
					← Tillbaka till startsidan
				</Link>
			</p>
		</article>
	);
}
