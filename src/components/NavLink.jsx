import Link from 'next/link';
import {
	storyblokEditable,
	StoryblokServerComponent,
} from '@storyblok/react/rsc';

function getNavHref(link) {
	if (!link) return null;

	const raw = link.cached_url || link.url || '';
	if (!raw) return null;

	if (raw.startsWith('http') || raw.startsWith('/')) return raw;

	return `/${raw}`;
}

export default function NavLink({ blok }) {
	const href = getNavHref(blok.link);
	const hasChildren = blok.children?.length > 0;

	return (
		<li
			{...storyblokEditable(blok)}
			className="relative group flex items-stretch"
		>
			{href ? (
				<Link
					href={href}
					className="flex items-center h-full text-sm font-medium text-slate-600 border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 transition-colors uppercase"
				>
					{blok.label}
				</Link>
			) : (
				<span className="flex items-center h-full text-sm font-medium text-slate-600 cursor-default uppercase">
					{blok.label}
				</span>
			)}

			{hasChildren && (
				<ul className="invisible opacity-0 -translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 absolute top-full left-0 w-56 bg-white rounded-b-lg border border-slate-100 px-4 py-4 space-y-2 origin-top transition-all duration-150 ease-out z-50">
					{blok.children.map((child) => (
						<StoryblokServerComponent blok={child} key={child._uid} />
					))}
				</ul>
			)}
		</li>
	);
}
