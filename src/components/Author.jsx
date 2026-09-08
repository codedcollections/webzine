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
	console.log('BLOK:', blok);

	const articles = articlesData.stories;

	return (
		<article {...storyblokEditable(blok)}>
			<div className="grid grid-cols-2 place-items-center">
				<div className="flex flex-col items-center gap-3">
					<h2 className="flex text-2xl">{blok.name}</h2>
					<p className="flex text-center">{blok.bio}</p>
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

			<h2 className="flex text-3xl font-bold mb-3">Inlägg av {blok.name}</h2>

			{articles.length === 0 ? (
				<p>Inga inlägg ännu.</p>
			) : (
				<ul className="flex flex-col gap-4 mb-4">
					{articles.map((article) => (
						<li key={article.uuid}>
							<Link href={`/${article.full_slug}`}>
								{article.content.title}
							</Link>
						</li>
					))}
				</ul>
			)}

			<p>
				<Link href="/">← Tillbaka till startsidan</Link>
			</p>
		</article>
	);
}
