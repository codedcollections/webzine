import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { getCategoryStyle } from '@/lib/categoryStyles';
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
            className="max-w-3xl mx-auto px-4 py-10"
		>
			<div className="grid grid-cols-2 place-items-center gap-6 mb-10 pb-10 border-b border-gray-100">
				<div className="flex flex-col items-center gap-3">
					<h1 className="text-2xl font-bold text-gray-900">{blok.name}</h1>
					
					<p className="text-center text-gray-600 leading-relaxed">
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

			<h2 className="text-2xl font-bold text-gray-900 mb-3">
				Artiklar av {blok.name}
			</h2>
			<div className="w-10 h-1 bg-blue-600 rounded-full mb-6" />

			{articles.length === 0 ? (
				<p className="text-gray-500">Inga artiklar ännu.</p>
			) : (
				<ul className="divide-y divide-gray-100">
					{articles.map((article) => (
						<li key={article.uuid} className="py-6 first:pt-0">
							<Link
								href={`/${article.full_slug}`}
								className="flex gap-4 group"
							>
								<div className="flex-1 min-w-0">
                                    <span
                                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${getCategoryStyle(article.content.category)}`}
                                    >
                                        {article.content.category?.toUpperCase()}
                                    </span>

                                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                                        {article.content.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-2 mb-3">
                                        {article.published_at && (
                                            <span className="flex items-center gap-1">
                                                📅{' '}
                                                {new Date(article.published_at).toLocaleDateString('sv-SE')}
                                            </span>
                                        )}
                                    </div>

                                    {article.content.summary && (
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {article.content.summary}
                                        </p>
                                    )}
                                </div>
							</Link>
						</li>
					))}
				</ul>
			)}

			<p className="mt-10">
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
