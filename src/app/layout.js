import './globals.css';
import StoryblokProvider from '@/components/StoryblokProvider';
import { getStoryblokApi } from '@/lib/storyblok';
import { StoryblokServerComponent } from '@storyblok/react/rsc';

export async function generateMetadata() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.get("cdn/stories/config", {
    version: "published",
  });

  const faviconUrl = data.story.content.favicon?.filename;

  if (!faviconUrl) return {};

  return {
    icons: {
      icon: faviconUrl,
    },
  };
}

export default async function RootLayout({ children }) {
	const storyblokApi = getStoryblokApi();
	const { data } = await storyblokApi.get('cdn/stories/config', {
		version: 'published',
		resolve_links: 'url',
	});

	const config = data.story.content;
	const headerBlok = config.header?.[0];
	const footerBlok = config.footer?.[0];

	return (
		<html lang="sv">
			<body>
				<StoryblokProvider>
					{headerBlok && <StoryblokServerComponent blok={headerBlok} />}
					<div>{children}</div>
					{footerBlok && <StoryblokServerComponent blok={footerBlok} />}
				</StoryblokProvider>
			</body>
		</html>
	);
}
