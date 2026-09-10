import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { getCategoryStyle } from '@/lib/categoryStyles';

export default async function Hero({ blok }) {
    const storyblokApi = getStoryblokApi();

    const { data } = await storyblokApi.getStories({
        version: 'published',
        starts_with: 'articles/',
        content_type: 'article',
        resolve_relations: 'article.author',
        sort_by: 'first_published_at:desc',
        per_page: 1,
    });

    const post = data.stories[0];
    if (!post) return null;

    const author = post.content.author?.[0];

    return (
        <section
            {...storyblokEditable(blok)}
            className="bg-linear-to-b from-blue-50 via-white to-white border-b border-gray-100"
        >
            {blok.heading && (
                <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide text-center pt-16 mb-6 px-4">
                    {blok.heading}
                </h2>
            )}

            <Link
                href={`/${post.full_slug}`}
                className="group block px-4 pb-16 text-center"
            >
                <div className="max-w-3xl mx-auto">
                    <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-5 ${getCategoryStyle(post.content.category)}`}
                    >
                        {post.content.category?.toUpperCase()}
                    </span>

                    <h3 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5 group-hover:text-blue-600 transition-colors">
                        {post.content.title}
                    </h3>

                    {post.content.summary && (
                        <p className="text-lg text-gray-600 leading-relaxed max-w-xl mx-auto mb-6">
                            {post.content.summary}
                        </p>
                    )}

                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                        {post.first_published_at && (
                            <span className="flex items-center gap-1">
                                📅{' '}
                                {new Date(post.first_published_at).toLocaleDateString('sv-SE')}
                            </span>
                        )}

                        {author?.content?.name && (
                            <span className="flex items-center gap-1">
                                👤 {author.content.name}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </section>
    );
}