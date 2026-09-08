import { getStoryblokApi } from "@/lib/storyblok";

const siteUrl = process.env.SITE_URL ?? "https://localhost:3000";

export default async function sitemap() {
  const storyblokApi = getStoryblokApi();

  const { data } = await storyblokApi.getStories({
    version: "published",
    per_page: 100,
  });

  const pages = data.stories
    .filter((story) => !story.full_slug.startsWith("config"))
    .map((story) => ({
      url: `${siteUrl}/${story.full_slug}`,
      lastModified: story.published_at ?? new Date(),
    }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...pages,
  ];
}