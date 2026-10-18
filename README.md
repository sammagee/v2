<a href="//nextjs.org"><img alt="Next JS" src="https://img.shields.io/badge/nextjs-%23000000.svg?&style=for-the-badge&logo=next.js&logoColor=white"/></a> <a href="//tailwindcss.com"><img alt="TailwindCSS" src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?&style=for-the-badge&logo=tailwind-css&logoColor=white"/></a>

### 👋 Hey, I'm Sam Magee

This is the repository that houses my portfolio and personal website @ [sammagee.me](https://sammagee.me).

To view this site locally, run the following:

```
pnpm install; pnpm dev
```

### ✍️ Writing a post

1. Create `src/posts/<slug>/post.mdx` (the folder name is the URL: `/thoughts/<slug>`).
2. Add frontmatter, then write Markdown/MDX below it:

   ```mdx
   ---
   title: My post
   subtitle: A short line under the title
   date: 2026-10-18
   draft: true
   ---

   import Counter from './counter'

   Some words, then a component: <Counter />
   ```

3. Put any one-off components next to it (e.g. `src/posts/<slug>/counter.tsx`, default export) and import them with a relative path.
4. Run `pnpm dev` and open `/thoughts/<slug>`. Drafts show locally and on preview deploys; remove `draft: true` to publish.

See `src/posts/kitchen-sink/post.mdx` for every supported element. After adding an external link, run `pnpm link-previews` and commit the updated `link-previews.json` and `public/link-icons/` so its tooltip has a title and favicon.
