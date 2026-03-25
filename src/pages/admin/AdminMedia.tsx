import { useState } from 'react'
import { useAllChapters } from '../../hooks/useAllChapters'

interface MediaItem {
  type: 'video' | 'image' | 'document'
  title: string
  source: string
  chapter?: string
}

export default function AdminMedia() {
  const { chapters, loading } = useAllChapters()
  const [filter, setFilter] = useState<'all' | 'video' | 'image' | 'document'>('all')

  // Extract all media from chapters
  const allMedia: MediaItem[] = []
  chapters.forEach(ch => {
    ch.content.forEach(block => {
      if (block.type === 'video' && block.video) {
        allMedia.push({
          type: 'video',
          title: block.video.title,
          source: `https://youtube.com/watch?v=${block.video.youtubeId}`,
          chapter: ch.title,
        })
      }
    })
  })

  // Static media assets used across the site
  const siteMedia: MediaItem[] = [
    { type: 'document', title: 'The Record (Full Book PDF)', source: '/the-record.pdf' },
    { type: 'image', title: 'Israel Dossier Evidence Photos', source: '/israel-dossier' },
    { type: 'image', title: 'Deep State Evidence Gallery', source: '/deep-state' },
  ]

  const combined = [...allMedia, ...siteMedia]
  const filtered = filter === 'all' ? combined : combined.filter(m => m.type === filter)

  const counts = {
    all: combined.length,
    video: combined.filter(m => m.type === 'video').length,
    image: combined.filter(m => m.type === 'image').length,
    document: combined.filter(m => m.type === 'document').length,
  }

  if (loading) return <div className="text-white/30 font-sans text-sm py-8 text-center">Loading media...</div>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-xl font-bold text-white">Media Library</h1>
        <p className="font-sans text-xs text-white/30 mt-1">{combined.length} assets across all chapters and pages</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'video', 'image', 'document'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-3 py-1.5 rounded font-sans text-xs tracking-wide transition-colors ${
              filter === tab
                ? 'bg-crimson/10 text-crimson'
                : 'bg-white/5 text-white/30 hover:text-white/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} ({counts[tab]})
          </button>
        ))}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-lg overflow-hidden hover:border-crimson/10 transition-colors">
            <div className="aspect-video bg-white/[0.02] flex items-center justify-center">
              {item.type === 'video' ? (
                <svg className="w-10 h-10 text-crimson/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : item.type === 'image' ? (
                <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              ) : (
                <svg className="w-10 h-10 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              )}
            </div>
            <div className="p-4">
              <p className="font-sans text-sm text-white/80 line-clamp-1">{item.title}</p>
              <div className="flex items-center justify-between mt-2">
                <span className={`inline-flex px-2 py-0.5 rounded font-sans text-[9px] font-bold tracking-wider uppercase ${
                  item.type === 'video' ? 'bg-crimson/10 text-crimson' :
                  item.type === 'image' ? 'bg-blue-500/10 text-blue-400' :
                  'bg-white/5 text-white/30'
                }`}>
                  {item.type}
                </span>
                {item.chapter && (
                  <span className="font-sans text-[10px] text-white/20 truncate ml-2">{item.chapter}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
