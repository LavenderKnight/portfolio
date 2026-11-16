import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import App from './App'

beforeEach(() => {
  window.history.replaceState(null, '', '/')
  localStorage.clear()
})

afterEach(cleanup)

describe('devbook', () => {
  it('opens a project from the profile tabs and explains the selected diagram stage', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(within(screen.getByRole('navigation', { name: 'Profile tabs' })).getByRole('link', { name: 'Projects' }))
    const main = within(screen.getByRole('main'))
    await user.click(await main.findByRole('link', { name: /Gamification & Leaderboard Engine/ }))
    expect(await main.findByRole('heading', { name: 'Gamification & Leaderboard Engine' })).toBeTruthy()
    expect(window.location.hash).toBe('#/projects/gamification')
    await user.click(main.getByRole('button', { name: 'Redis ranks' }))
    expect(main.getByRole('button', { name: 'Redis ranks' }).getAttribute('aria-pressed')).toBe('true')
    expect(main.getByText(/sorted set per leaderboard or season/)).toBeTruthy()
  })

  it('searches content and uses Enter to open a matching article', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.type(screen.getByRole('searchbox'), 'Why Idempotency')
    expect(await within(screen.getByRole('search')).findByRole('link', { name: /Why Idempotency/ })).toBeTruthy()
    await user.keyboard('{Enter}')
    expect(await within(screen.getByRole('main')).findByRole('heading', { name: 'A timeout leaves the outcome unknown' })).toBeTruthy()
  })

  it('opens direct note links and provides a fallback for an unknown project', async () => {
    window.history.replaceState(null, '', '/portfolio/#/notes/rag-pipeline')
    const { unmount } = render(<App />)
    expect(screen.getByRole('heading', { name: 'How a RAG Pipeline Actually Works' })).toBeTruthy()
    unmount()
    window.history.replaceState(null, '', '/portfolio/#/projects/unavailable')
    render(<App />)
    expect(screen.getByRole('heading', { name: 'Project unavailable' })).toBeTruthy()
  })

  it('keeps likes and comments on the current device across visits to a shared post', async () => {
    window.history.replaceState(null, '', '/portfolio/#/wall/career')
    const user = userEvent.setup()
    const { unmount } = render(<App />)
    const post = within(screen.getByRole('article'))
    await user.click(post.getByRole('button', { name: 'Like' }))
    await user.click(post.getByRole('button', { name: 'Comment' }))
    await user.type(post.getByRole('textbox', { name: 'Write a local comment' }), 'A useful career update')
    await user.click(post.getByRole('button', { name: 'Post' }))
    expect(post.getByText('A useful career update')).toBeTruthy()
    unmount()

    render(<App />)
    const restored = within(screen.getByRole('article'))
    expect(restored.getByRole('button', { name: 'Liked' }).getAttribute('aria-pressed')).toBe('true')
    await user.click(restored.getByRole('button', { name: 'Comment (1)' }))
    expect(restored.getByText('A useful career update')).toBeTruthy()
  })

  it('copies a direct post URL including the GitHub Pages base path', async () => {
    window.history.replaceState(null, '', '/portfolio/#/wall/career')
    const user = userEvent.setup()
    render(<App />)
    await user.click(within(screen.getByRole('article')).getByRole('button', { name: 'Share' }))
    expect(await screen.findByText('Post link copied.')).toBeTruthy()
    expect(await navigator.clipboard.readText()).toBe(`${location.origin}/portfolio/#/wall/career`)
  })
})
