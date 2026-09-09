import Page from '@/components/Page';
import FilteredPosts from '@/components/FilteredPosts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavLink from '@/components/NavLink';
import Author from '@/components/Author';
import Article from '@/components/Article';
import ArticleList from '@/components/ArticleList';
import Hero from '@/components/Hero';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		article: Article,
		"article-list": ArticleList,
		'filtered-posts': FilteredPosts,
		header: Header,
		footer: Footer,
		'nav-link': NavLink,
		author: Author,
		hero: Hero,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
