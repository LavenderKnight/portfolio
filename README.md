# devbook · Haricharan Dharmaji

A static React and TypeScript portfolio styled after early-2010s social profiles. The Wall, project case studies, photo albums, and technical Notes are linked with hash routes that work under a GitHub Pages repository path.

## Local development

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run lint
npm test
npm run build
npm run preview
```

Open the URL printed by Vite. The development server uses the root path. The production build defaults to `/portfolio/`. Visit that path when running the production preview.

## Customize the portfolio

| Path | What to edit |
| --- | --- |
| `src/data/profile.ts` | Name, headline, bio, links, email, images, résumé path, education, and skills. Set `github` to a confirmed profile URL. |
| `src/data/experience.ts` | Roles, employment dates, and accomplishments. |
| `src/data/projects.ts` | Add a unique ID, case study copy, technology list, and three diagram stages. |
| `src/data/notes.ts` | Add a unique ID, title, summary, and article sections. |
| `src/data/posts.ts` | Edit the Wall feed and contextual links. |
| `src/portfolio.ts` | Edit photo albums and the search index. New projects, notes, skills, and roles are indexed automatically. |
| `src/styles.css` | Layout, colors, component styles, and responsive breakpoints. |

To replace the portraits or résumé, put the files in `public/images/` or `public/resume/` and update their relative paths in `src/data/profile.ts`. Set `resume` to `null` to hide the download. The supplied PDF includes an email address and phone number, and those details will be available to anyone who downloads it from a public site.

The lending and retail loss-ratio case studies are illustrative. Update their context and outcomes if you can verify the implementation details. Company project diagrams use sanitized descriptions. Technology marks are bundled from [Simple Icons](https://simpleicons.org/).

## Publish with GitHub Pages

1. Create a GitHub repository, such as `portfolio`, and add it as the local `origin`.
2. In GitHub, open **Settings → Pages** and select **GitHub Actions** as the source. See [GitHub's publishing source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
3. Commit the source and push to `main`.

```sh
git branch -M main
git remote add origin https://github.com/USERNAME/portfolio.git
git add .
git commit -m "Build devbook portfolio"
git push -u origin main
```

`.github/workflows/deploy.yml` installs from the lockfile, runs linting and tests, builds the site, and deploys `dist/`. You can also start it via **Actions → Deploy portfolio to GitHub Pages → Run workflow**. The workflow reads the repository base path from Pages. To override it, set the repository variable `PORTFOLIO_BASE`, for example `/other-repo/` or `/` for a root deployment. See [Vite's GitHub Pages configuration](https://vite.dev/guide/static-deploy.html#github-pages).

## Architecture

`App.tsx` maps hashes such as `#/projects/gamification` to page components. Shared layout and controls live in `src/components/`. Typed content lives in `src/data/` and is bundled at build time. Likes and demo comments use local browser storage. The application has no server, analytics integration, account system, or remote comment submission.
