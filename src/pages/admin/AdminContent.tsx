import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAllChapters } from '../../hooks/useAllChapters'

interface DraftArticle {
  id: string
  title: string
  slug: string
  category: string
  tier: string
  body: string
  sources: string[]
  status: 'draft' | 'published'
  createdAt: string
  updatedAt: string
}

function generateSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function loadArticles(): DraftArticle[] {
  try { return JSON.parse(localStorage.getItem('veritas_articles') || '[]') }
  catch { return [] }
}

function saveArticles(articles: DraftArticle[]) {
  localStorage.setItem('veritas_articles', JSON.stringify(articles))
}
export default function AdminContent() {
  const { chapters, loading } = useAllChapters()
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'chapters' | 'articles' | 'generator'>('chapters')
  const [articles, setArticles] = useState<DraftArticle[]>(loadArticles())
  const [editingArticle, setEditingArticle] = useState<DraftArticle | null>(null)

  // Article generator state
  const [genTitle, setGenTitle] = useState('')
  const [genCategory, setGenCategory] = useState('News')
  const [genTier, setGenTier] = useState('Verified')
  const [genBody, setGenBody] = useState('')
  const [genSources, setGenSources] = useState<string[]>([''])

  const filtered = chapters.filter(ch =>
    ch.title.toLowerCase().includes(search.toLowerCase()) ||
    ch.id.toLowerCase().includes(search.toLowerCase())
  )
  const totalBlocks = chapters.reduce((sum, ch) => sum + ch.content.length, 0)
  const totalVideos = chapters.reduce((sum, ch) => sum + ch.content.filter((b: any) => b.type === 'video').length, 0)

  const saveArticle = (status: 'draft' | 'published') => {
    if (!genTitle.trim()) return
    const article: DraftArticle = {
      id: editingArticle?.id || crypto.randomUUID(),
      title: genTitle,
      slug: generateSlug(genTitle),
      category: genCategory,
      tier: genTier,
      body: genBody,
      sources: genSources.filter(s => s.trim()),
      status,
      createdAt: editingArticle?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = editingArticle
      ? articles.map(a => a.id === editingArticle.id ? article : a)
      : [...articles, article]
    setArticles(updated)
    saveArticles(updated)
    resetGenerator()
    setTab('articles')
  }

  const deleteArticle = (id: string) => {
    const updated = articles.filter(a => a.id !== id)
    setArticles(updated)
    saveArticles(updated)
  }

  const editArticle = (article: DraftArticle) => {
    setGenTitle(article.title)
    setGenCategory(article.category)
    setGenTier(article.tier)
    setGenBody(article.body)
    setGenSources(article.sources.length ? article.sources : [''])
    setEditingArticle(article)
    setTab('generator')
  }

  const resetGenerator = () => {
    setGenTitle(''); setGenCategory('News'); setGenTier('Verified')
    setGenBody(''); setGenSources(['']); setEditingArticle(null)
  }

  if (loading) return <div className="text-white/30 font-sans text-sm py-8 text-center">Loading...</div>
  return (
    <div className="space-y-6">
      {/* Header + Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-xl font-bold text-white">Content</h1>
          <p className="font-sans text-xs text-white/30 mt-1">
            {chapters.length} chapters · {totalBlocks} blocks · {totalVideos} videos · {articles.length} articles
          </p>
        </div>
        <div className="flex gap-1">
          {(['chapters', 'articles', 'generator'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); if (t === 'generator' && !editingArticle) resetGenerator() }}
              className={`px-3 py-1.5 rounded font-sans text-xs tracking-wide transition-colors ${
                tab === t ? 'bg-crimson/10 text-crimson' : 'bg-white/5 text-white/30 hover:text-white/50'
              }`}
            >
              {t === 'chapters' ? 'Chapters' : t === 'articles' ? `Articles (${articles.length})` : editingArticle ? 'Edit Article' : 'New Article'}
            </button>
          ))}
        </div>
      </div>

      {/* ── TAB: Chapters ──────────────────────────── */}
      {tab === 'chapters' && (
        <div className="space-y-4">
          <input
            type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search chapters..."
            className="w-full max-w-xs px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-sans text-xs focus:outline-none focus:border-crimson/30"
          />          <div className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30 w-8">#</th>
                  <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Title</th>
                  <th className="px-5 py-3 text-center font-sans text-[10px] tracking-widest uppercase text-white/30">Blocks</th>
                  <th className="px-5 py-3 text-center font-sans text-[10px] tracking-widest uppercase text-white/30">Videos</th>
                  <th className="px-5 py-3 text-right font-sans text-[10px] tracking-widest uppercase text-white/30">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((ch, i) => {
                  const videoCount = ch.content.filter((b: any) => b.type === 'video').length
                  return (
                    <tr key={ch.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-white/20">{i + 1}</td>
                      <td className="px-5 py-3">
                        <p className="font-serif text-sm text-white/80">{ch.title}</p>
                        <p className="font-mono text-[10px] text-white/20 mt-0.5">{ch.id}</p>
                      </td>
                      <td className="px-5 py-3 text-center font-mono text-xs text-white/40">{ch.content.length}</td>
                      <td className="px-5 py-3 text-center">
                        {videoCount > 0 ? (
                          <span className="inline-flex px-2 py-0.5 rounded bg-crimson/10 text-crimson font-mono text-[10px]">{videoCount}</span>
                        ) : (
                          <span className="font-mono text-xs text-white/20">—</span>
                        )}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Link to={`/chapter/${ch.id}`} className="font-sans text-[10px] text-crimson hover:text-crimson-light tracking-wide">Open →</Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* ── TAB: Articles ──────────────────────────── */}
      {tab === 'articles' && (
        <div className="space-y-4">
          {articles.length === 0 ? (
            <div className="bg-white/5 border border-white/5 rounded-lg px-5 py-12 text-center">
              <p className="font-sans text-sm text-white/20 mb-3">No articles yet</p>
              <button onClick={() => setTab('generator')} className="px-4 py-2 bg-crimson/10 text-crimson font-sans text-xs rounded hover:bg-crimson/20">
                Create First Article
              </button>
            </div>
          ) : (
            <div className="bg-white/5 border border-white/5 rounded-lg overflow-hidden divide-y divide-white/5">
              {articles.map(article => (
                <div key={article.id} className="px-5 py-4 flex items-center justify-between hover:bg-white/[0.02]">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex px-1.5 py-0.5 rounded font-sans text-[9px] font-bold tracking-wider uppercase ${
                        article.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>{article.status}</span>
                      <span className={`inline-flex px-1.5 py-0.5 rounded font-sans text-[9px] tracking-wider uppercase ${
                        article.tier === 'Verified' ? 'bg-[#166534]/10 text-[#166534]' :
                        article.tier === 'Circumstantial' ? 'bg-[#92400E]/10 text-[#92400E]' :
                        'bg-[#991B1B]/10 text-[#991B1B]'
                      }`}>{article.tier}</span>
                      <span className="font-sans text-[10px] text-white/20">{article.category}</span>
                    </div>
                    <p className="font-serif text-sm text-white/80 truncate">{article.title}</p>
                    <p className="font-mono text-[10px] text-white/20 mt-0.5">/{article.slug} · {new Date(article.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button onClick={() => editArticle(article)} className="font-sans text-[10px] text-crimson hover:text-crimson-light">Edit</button>
                    <button onClick={() => deleteArticle(article.id)} className="font-sans text-[10px] text-white/20 hover:text-red-400">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      {/* ── TAB: Article Generator ─────────────────── */}
      {tab === 'generator' && (
        <div className="space-y-5 max-w-3xl">
          <div className="bg-white/5 border border-white/5 rounded-lg p-5 space-y-4">
            <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">
              {editingArticle ? 'Edit Article' : 'New Article'}
            </h3>

            {/* Title */}
            <div>
              <label className="block font-sans text-[10px] text-white/30 uppercase tracking-wider mb-1">Title</label>
              <input
                type="text" value={genTitle} onChange={e => setGenTitle(e.target.value)}
                placeholder="Article title..."
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-serif text-sm focus:outline-none focus:border-crimson/30"
              />
              {genTitle && (
                <p className="font-mono text-[10px] text-white/20 mt-1">Slug: /{generateSlug(genTitle)}</p>
              )}
            </div>

            {/* Category + Tier */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-[10px] text-white/30 uppercase tracking-wider mb-1">Category</label>
                <select value={genCategory} onChange={e => setGenCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-sans text-xs focus:outline-none focus:border-crimson/30"
                >
                  <option value="News">News</option>
                  <option value="Analysis">Analysis</option>
                  <option value="Investigation">Investigation</option>
                  <option value="Opinion">Opinion</option>
                </select>
              </div>              <div>
                <label className="block font-sans text-[10px] text-white/30 uppercase tracking-wider mb-1">Evidence Tier</label>
                <select value={genTier} onChange={e => setGenTier(e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-sans text-xs focus:outline-none focus:border-crimson/30"
                >
                  <option value="Verified">Verified</option>
                  <option value="Circumstantial">Circumstantial</option>
                  <option value="Disputed">Disputed</option>
                </select>
              </div>
            </div>

            {/* Body */}
            <div>
              <label className="block font-sans text-[10px] text-white/30 uppercase tracking-wider mb-1">Article Body</label>
              <textarea
                value={genBody} onChange={e => setGenBody(e.target.value)}
                placeholder="Write the article content..."
                rows={12}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-body text-sm leading-relaxed focus:outline-none focus:border-crimson/30 resize-y"
              />
              <p className="font-mono text-[10px] text-white/20 mt-1">{genBody.split(/\s+/).filter(Boolean).length} words</p>
            </div>

            {/* Sources */}
            <div>
              <label className="block font-sans text-[10px] text-white/30 uppercase tracking-wider mb-1">Sources</label>
              {genSources.map((source, i) => (
                <div key={i} className="flex items-center gap-2 mb-2">
                  <input
                    type="url" value={source}
                    onChange={e => { const s = [...genSources]; s[i] = e.target.value; setGenSources(s) }}
                    placeholder="https://..."
                    className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded text-white font-mono text-xs focus:outline-none focus:border-crimson/30"
                  />                  {genSources.length > 1 && (
                    <button onClick={() => setGenSources(genSources.filter((_, j) => j !== i))} className="text-white/20 hover:text-red-400 text-xs">✕</button>
                  )}
                </div>
              ))}
              <button onClick={() => setGenSources([...genSources, ''])} className="font-sans text-[10px] text-crimson hover:text-crimson-light">+ Add Source</button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2 border-t border-white/5">
              <button onClick={() => saveArticle('draft')} className="px-4 py-2 bg-white/5 text-white/50 font-sans text-xs rounded hover:bg-white/10 transition-colors">
                Save Draft
              </button>
              <button onClick={() => saveArticle('published')} className="px-4 py-2 bg-crimson text-white font-sans text-xs rounded hover:bg-crimson-dark transition-colors">
                Publish
              </button>
              {editingArticle && (
                <button onClick={() => { resetGenerator(); setTab('articles') }} className="font-sans text-[10px] text-white/30 hover:text-white/50 ml-auto">
                  Cancel Edit
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
