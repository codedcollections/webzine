import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";
import { notFound } from "next/navigation";

export async function generateMetadata() {
  const storyblokApi = getStoryblokApi()

  const {data} = await storyblokApi.get("cdn/stories/articles", {
    version: "draft"
  })

  const content = data.story.content

  return{
    title: content.seo_title || data.story.name,
    description: content.seo_description || "En sida full med artiklar"
  }
}

export default async function ArticlesPage() {
  let story;

  try {
    const storyblokApi = getStoryblokApi()
    const {data} = await storyblokApi.get("cdn/stories/articles", {
      version: "draft"
    })
    story = data.story
  } catch{
    notFound()
  }

  return <StoryblokStory story={story}/>
}