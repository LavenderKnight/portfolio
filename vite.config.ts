import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'
import { profile } from './src/data/profile'

export default defineConfig(({ command, isPreview }) => ({
  base: command === 'serve' && !isPreview ? '/' : process.env.PORTFOLIO_BASE || '/portfolio/',
  plugins: [
    react(),
    {
      name: 'profile-metadata',
      transformIndexHtml() {
        const title = `${profile.name} | ${profile.brand}`
        return [
          { tag: 'title', children: title },
          { tag: 'meta', attrs: { name: 'description', content: profile.description } },
          { tag: 'meta', attrs: { property: 'og:title', content: title } },
          { tag: 'meta', attrs: { property: 'og:description', content: profile.description } },
          { tag: 'meta', attrs: { property: 'og:site_name', content: profile.brand } },
        ]
      },
    },
  ],
  test: { environment: 'jsdom' },
}))
