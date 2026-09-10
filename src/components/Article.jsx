import { renderRichText, storyblokEditable } from '@storyblok/react/rsc';
import { getCategoryStyle } from '@/lib/categoryStyles';
import Link from 'next/link';

export default function Article({ blok }) {
	const renderedContent = renderRichText(blok.content);

	return (
		<div className="max-w-3xl mx-auto px-4 py-10">
			<article
				{...storyblokEditable(blok)}
				className="bg-gray-50 border border-gray-100 rounded-2xl p-8 md:p-10"
			>
				<p className='mb-6'>
					<Link
						href="/articles"
						className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
					>
						← Tillbaka till artikellistan
					</Link>
				</p>

				<span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 ${getCategoryStyle(blok.category)}`}>
					{blok.category?.toUpperCase()}
				</span>

				<h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">{blok.title}</h1>

				<p className="text-lg text-gray-600 mb-8">{blok.summary}</p>

				<div
					className="rich-text mb-10 text-gray-700"
					dangerouslySetInnerHTML={{ __html: renderedContent }}
				/>

				{(blok.author ?? []).length > 0 && (
					<div className="flex items-center gap-2 pt-6 border-t border-gray-200 text-sm text-gray-500">
						<span>Skriven av</span>
						{blok.author.map((author) => (
							<Link
								key={author.uuid}
								href={`/authors/${author.slug}`}
								className="font-semibold text-gray-900 hover:text-blue-600 transition-colors"
							>
								{author.content?.name ?? author.name}
							</Link>
						))}
					</div>
				)}
			</article>
		</div>
	);
}
