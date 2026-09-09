import { renderRichText, storyblokEditable } from '@storyblok/react';
import Link from 'next/link';

export default function Article({ blok }) {
	const renderedContent = renderRichText(blok.content);

	return (
		<article
			{...storyblokEditable(blok)}
			className="max-w-3xl mx-auto my-10 px-8 py-10 bg-slate-50 border border-slate-200 rounded-xl shadow-sm"
		>
			<p>
				<Link
					href="/articles"
					className="text-sm text-slate-500 hover:text-blue-600"
				>
					Tillbaka till Artikel listan
				</Link>
			</p>

			<p className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 mt-6">
				{blok.category?.toUpperCase()}
			</p>

			<h1 className="text-3xl font-bold text-slate-900 mt-3">{blok.title}</h1>

			<p className="text-slate-600 text-base mt-2 mb-6">{blok.summary}</p>

			<div
				className="rich-text mb-8 text-slate-700"
				dangerouslySetInnerHTML={{ __html: renderedContent }}
			/>

			<div className="flex items-center gap-3 mt-6 px-4 py-3 bg-slate-100 border-l-4 border-blue-600 rounded-md text-slate-700">
				{(blok.author ?? []).map((author) => (
					<Link
						key={author.uuid}
						href={`/authors/${author.slug}`}
						className="italic font-semibold hover:text-blue-600"
					>
						{author.content?.name ?? author.name}
					</Link>
				))}
			</div>
		</article>
	);
}
