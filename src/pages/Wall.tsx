import { useState, type FormEvent } from 'react'
import { ArrowRight, BriefcaseBusiness, FileText, Mail, MessageSquare, Share2, ThumbsUp } from 'lucide-react'
import { Avatar, CopyButton, ProjectPreview, shareUrl, Widget } from '../components/common'
import { posts } from '../data/posts'
import { profile } from '../data/profile'
import { projects } from '../data/projects'

type Interactions = { liked: boolean; comments: string[] }
const empty: Interactions = { liked: false, comments: [] }

function readInteractions(key: string): Interactions {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? 'null')
    if (typeof value?.liked === 'boolean' && Array.isArray(value.comments) && value.comments.every((comment: unknown) => typeof comment === 'string')) {
      return { liked: value.liked, comments: value.comments }
    }
  } catch {
    // The wall remains usable when browser storage is unavailable.
  }
  return empty
}

function WallPost({ post }: { post: typeof posts[number] }) {
  const storageKey = `devbook:post:${post.id}`
  const [interactions, setInteractions] = useState(() => readInteractions(storageKey))
  const [commentsOpen, setCommentsOpen] = useState(false)
  const [comment, setComment] = useState('')
  const project = 'project' in post && projects.find((entry) => entry.id === post.project)

  function update(next: Interactions) {
    setInteractions(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      // The current visit still reflects the interaction.
    }
  }

  function addComment(event: FormEvent) {
    event.preventDefault()
    const text = comment.trim()
    if (!text) return
    update({ ...interactions, comments: [...interactions.comments, text] })
    setComment('')
  }

  return <article className="wall-post" id={`post-${post.id}`}>
    <Avatar decorative className="post-avatar" />
    <div className="post-content">
      <header className="post-header"><a href="#/info">{profile.name}</a><a href={`#/wall/${post.id}`} className="post-category">{post.category}</a></header>
      <p>{post.text}</p>
      {project && <a className="feed-preview" href={post.action.href} aria-label={`${post.action.label} for ${project.title}`}>
        <ProjectPreview project={project} />
        <span className="preview-caption"><span><strong>{project.title}</strong><small>{project.summary}</small></span><ArrowRight size={15} aria-hidden="true" /></span>
      </a>}
      {!project && <a className="post-link" href={post.action.href}>{post.action.label} <ArrowRight size={13} aria-hidden="true" /></a>}
      <div className="post-actions">
        <button type="button" aria-pressed={interactions.liked} onClick={() => update({ ...interactions, liked: !interactions.liked })}><ThumbsUp size={13} />{interactions.liked ? 'Liked' : 'Like'}</button>
        <button type="button" aria-expanded={commentsOpen} aria-controls={`comments-${post.id}`} onClick={() => setCommentsOpen(!commentsOpen)}>
          <MessageSquare size={13} />Comment{interactions.comments.length ? ` (${interactions.comments.length})` : ''}
        </button>
        <Share2 size={13} className="share-icon" aria-hidden="true" />
        <CopyButton value={shareUrl(`/wall/${post.id}`)} label="Share" message="Post link copied." className="text-button" />
      </div>
      <div className="comments" id={`comments-${post.id}`} hidden={!commentsOpen}>
        <p className="muted">Demo comments are stored on this device.</p>
        {interactions.comments.length > 0 && <ul>{interactions.comments.map((text, index) => <li key={index}>{text}</li>)}</ul>}
        <form onSubmit={addComment}>
          <input aria-label="Write a local comment" placeholder="Write a comment…" value={comment} maxLength={400} onChange={(event) => setComment(event.target.value)} />
          <button className="button" disabled={!comment.trim()} type="submit">Post</button>
        </form>
      </div>
    </div>
  </article>
}

export function Wall({ item }: { item: string }) {
  const current = item ? posts.find((post) => post.id === item) : undefined
  if (item && !current) return <Widget title="Post unavailable"><a href="#/wall">Back to the wall</a></Widget>
  return <>
    {!current && <section className="composer" aria-label="Explore the portfolio">
      <div className="composer-title"><MessageSquare size={14} aria-hidden="true" /> Share</div>
      <div className="composer-body"><p>What are you working on?</p></div>
      <div className="composer-actions">
        <a href="#/projects"><BriefcaseBusiness size={14} /> Browse projects</a>
        <a href="#/resume"><FileText size={14} /> View résumé</a>
        <a href="#/contact"><Mail size={14} /> Say hello</a>
      </div>
    </section>}
    <section className="wall" aria-label="Wall posts">
      <div className="wall-heading"><h2>{current ? 'Wall post' : 'Wall'}</h2>{current ? <a href="#/wall">Back to the wall</a> : <span>Recent posts</span>}</div>
      {(current ? [current] : posts).map((post) => <WallPost key={post.id} post={post} />)}
    </section>
  </>
}
