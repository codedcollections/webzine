import { getStoryblokApi } from "@/lib/storyblok";
import { storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default async function ArticleList({blok}) {
  const storyblokApi = getStoryblokApi()

  const {data} = await storyblokApi.getStories({
    version: "published",
    starts_with: "articles/",
    content_type: "article",
    resolve_relations: "article.author"
  })

  const stories = data.stories

  return(
    <section {...storyblokEditable(blok)}>
      {blok.heading && 
        <h1> {blok.heading} </h1>
      }

      {stories.length === 0 ? (
        <p>{blok.empty_text || "Inga Artiklar"}</p>
      ): (
        stories.map((story) => (
          <article key={story.uuid}>
            <Link href={`/${story.full_slug}`}>
              <p>{story.content.category}</p>
              <h2>
                {story.content.title}
              </h2>

              <p>{story.content.summary}</p>

              {story.content.author?.[0]?.content?.name && (
                <p>{story.content.author[0].content.name}</p>
              )}
            </Link>
          </article>
        ))
      
      )}
    </section>
  )

}