# WebZine (Content-Driven News Site)

A full-scale news website built with Next.js and Storyblok as a headless CMS, featuring two related content types, dynamic category routing, and a fully editor-managed navigation and layout. Developed as a collaborative group project, built as a new codebase and CMS space from the ground up.

[Live Demo](https://webzine-silk.vercel.app/)

## Features

* **Relational Content**: Articles are linked to authors through Storyblok's Reference field, so author bios and photos are resolved and displayed directly on article, category, and author pages.
* **Article Listing (`/articles`)**: A list view showing every article's title, summary, and author name, each linking through to its full detail page.
* **Article Detail Pages (`/articles/[slug]`)**: Full RichText article content with a resolved link to the author's page, plus per-page SEO metadata.
* **Author Pages (`/authors/[slug]`)**: A dedicated page per author showing their photo and bio, alongside a live-filtered list of every article they've written.
* **Content-Driven Category Routing (`/categories/[slug]`)**: Categories are managed entirely from Storyblok via a Datasource, with a single shared layout story rendering filtered article lists for any category URL — adding a new category requires no new code or routes.
* **Dynamic Hero Section**: The homepage automatically surfaces the most recently published article, including its category, author, and publish date, without manual curation.
* **Multi-Level Navigation**: A recursive navigation component built from nestable Storyblok blocks, supporting dropdown submenus with full keyboard accessibility via `focus-within`.
* **SEO Foundations**: Per-page metadata via `generateMetadata`, static generation via `generateStaticParams`, and a generated `sitemap.xml`/`robots.txt` driven by environment configuration.
* **Automatic Redeployment**: A Storyblok webhook triggers a new Vercel deployment whenever content is published, so the live site stays in sync with the CMS without manual redeploys.

## Technical Implementation

The group built the category routing system, the author-reference data flow, and the homepage hero component. Key technical highlights include:

* **Content-Driven Routing**: Built `app/categories/[slug]/page.jsx` to fetch a shared layout story and pass the URL slug down through the component tree, allowing a single `filtered-posts` block to filter articles by category with no per-category code.
* **Reference Resolution**: Used Storyblok's `resolve_relations` to hydrate author data on article queries, including handling the API's array-based reference structure to correctly surface author names and bios across list, detail, and author views.
* **Author Filtering**: Implemented `filter_query` against an author's UUID to list every article referencing that author, matching the reverse-lookup pattern needed for `/authors/[slug]`.
* **Data Fetching for Dynamic Sections**: Implemented server-side fetching for the homepage Hero block, sorting published stories by `first_published_at` to always reflect the latest content without relying on manually maintained "featured" flags.
* **Accessible Navigation**: Extended a flat navigation block into a recursive, two-level menu structure, using CSS `group` and `focus-within` states to support both mouse and keyboard interaction without client-side JavaScript.
* **Static Generation & Metadata**: Used `generateStaticParams` on both article and author routes to pre-render pages at build time, and `generateMetadata` to produce per-page titles and descriptions for SEO.

## Tech Stack

* **Frontend**: Next.js (App Router), React Server Components, JavaScript (ES6+)
* **CMS**: Storyblok (headless CMS, Content Delivery API, Datasources, Reference fields)
* **Styling**: Tailwind CSS
* **Deployment**: Vercel, with webhook-triggered rebuilds on content publish
* **Collaboration**: Git-flow, feature branches, peer-reviewed pull requests

## Project Methodology

* **Content Modeling First**: Content types (`article`, `author`, `category`) and their relationships were defined in Storyblok before any frontend code was written.
* **Git Flow**: Used a strict branching strategy with feature branches per component/route and peer review before merging.
* **Shared Component Ownership**: Layout components (`Page`, `Header`) were built to be generic and reusable across all block types, keeping page-level code minimal and CMS-driven.
* **New Foundation**: Built as a standalone repository and Storyblok space, separate from any earlier individual or course-related projects, to establish clean collaborative workflows from the start.

## Installation & Setup

1. Clone the repository:

```
git clone https://github.com/your-username/webzine.git
```

2. Install dependencies:

```
npm install
```

3. Add environment variables (create a `.env` file):

```
STORYBLOK_DELIVERY_API_TOKEN=your_token_here
STORYBLOK_REGION=eu
SITE_URL=http://localhost:3000
```

4. Start the development server:

```
npm run dev
```

Developed by Ebba Eneqvist, Marcus Unander and Desirée Strand.