import { renderRichText, storyblokEditable } from "@storyblok/react";
import Link from "next/link";

export default function Article({blok}) {
  const renderedContent = renderRichText(blok.content)

  return(
    <article {...storyblokEditable(blok)}>
      <p>
        <Link href="/article">
         Tillbaka till Artikel listan
        </Link>
      </p>

      <h1>{blok.title}</h1>

      <p>{blok.summary}</p>

      <div
        className="rich-text mb-8"
        dangerouslySetInnerHTML={{__html: renderedContent}}
      />

      <p>{blok.author}</p>

    </article>
  )
}