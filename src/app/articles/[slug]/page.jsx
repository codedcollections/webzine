import { getStoryblokApi } from "@/lib/storyblok"
import { StoryblokServerComponent } from "@storyblok/react/rsc"
import { notFound } from "next/navigation"

export async function generateMetadata({params}) {
  const {slug} = await params
  const storyblokApi = getStoryblokApi()

  const {data} = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
    version: "draft"
  })

  const story = data.story

  console.log("Story: ", story)

  return{
    title: story.content.title,
    description: story.content.summary
  }
}

export default async function ArticlePostPage ({params}) {
  const {slug} = await params
  const storyblokApi = getStoryblokApi()

  let story
  try {
    const {data} = await storyblokApi.get(`cdn/stories/articles/${slug}`, {
      version: "draft",
      resolve_relations: "article.author"
    })
    story = data.story
  } catch{
    notFound()
  }

  return <StoryblokServerComponent blok={story.content}/>
}