import { getStoryblokApi } from "@/lib/storyblok";
import { storyblokEditable } from '@storyblok/react/rsc';
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
    <section {...storyblokEditable(blok)}
      className="max-w-3xl mx-auto px-4 py-10">
      {blok.heading && 
				  <h1 className="m-0 mb-6 text-3xl font-bold text-slate-900">
            {blok.heading}
          </h1>
      }

      <ul className="list-none divide-y divide-slate-100">
        {stories.length === 0 ? (
          <p>{blok.empty_text || "Inga Artiklar"}</p>
        ): (
          stories.map((story) => {
            const author = story.content.author?.[0];

            return (
              <li key={story.uuid} className="border-b border-slate-200 py-6">
                <Link
                  href={`/categories/${story.content.category}`}
                  className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 mt-6 uppercase"
                >
                  {story.content.category}
                </Link>

                <Link href={`/${story.full_slug}`} className="block group">
                  <h2 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600">
                  {story.content.title}
                </h2>

                <div className="mt-2 flex items-center gap-4 text-sm text-slate-500">
                  {story.published_at && (
                    <span>
                      📅{' '}
                      {new Date(story.published_at).toLocaleDateString('sv-SE')}
                    </span>
                  )}

                  {author && (
                    <span>
                      👤 {author.content?.name ?? author.name}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-slate-600">
                  {story.content.summary}
                </p>
              </Link>
              </li>
            );
          })
        )}
      </ul>
    </section>
  )
}