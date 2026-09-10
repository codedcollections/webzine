import Link from 'next/link';
import { storyblokEditable } from '@storyblok/react/rsc';
import { getCategoryStyle } from '@/lib/categoryStyles';

function getNavHref(link) {
	if (!link) return null;

	const raw = link.cached_url || link.url || '';
	if (!raw) return null;

	if (raw.startsWith('http') || raw.startsWith('/')) return raw;

	return `/${raw}`;
}

export default function CategoryItem({ blok }) {
	const href = getNavHref(blok.link);
	const slug = blok.link?.cached_url?.split('/').pop();

	if (!href) return null;

	return (
		<li {...storyblokEditable(blok)}>
			<Link
				href={href}
				className="flex items-center justify-between py-2.5 group"
			>
				<span className="flex items-center gap-3 text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
					<span
						className={`w-9 h-9 flex items-center justify-center rounded-full text-base ${getCategoryStyle(slug)}`}
					>
						{blok.icon || '📄'}
					</span>

					{blok.label}
				</span>

				<span className="text-gray-300 text-lg group-hover:text-blue-600 transition-colors">
					→
				</span>
			</Link>
		</li>
	);
}
