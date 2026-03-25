import { useState, useEffect } from 'react'
import { useAllChapters } from '../../hooks/useAllChapters'
import { chapterImages, type ChapterImage } from '../../data/chapterImages'
import { getBrokenImages, clearBrokenImages } from '../../components/ImageWithFallback'

type MediaFilter = 'all' | 'images' | 'videos' | 'broken'
type ImageStatus = 'loading' | 'ok' | 'broken'

export default function AdminMedia() {
  const { chapters, loading } = useAllChapters()
  const [filter, setFilter] = useState<MediaFilter>('all')
  const [imageStatuses, setImageStatuses] = useState<Record<string, ImageStatus>>({})
  const [checking, setChecking] = useState(false)
  const [overrides, setOverrides] = useState<Record<string, string>>(() => {
    try { return JSON.parse(localStorage.getItem('veritas_image_overrides') || '{}') }
    catch { return {} }
  })
  const [editingUrl, setEditingUrl] = useState<Record<string, string>>({})

  // Collect all images
  const allImages: (ChapterImage & { chapterId: string })[] = []
  Object.entries(chapterImages).forEach(([chapterId, imgs]) => {
    imgs.forEach(img => allImages.push({ ...img, chapterId }))
  })

  // Collect all videos
  const allVideos: { title: string; youtubeId: string; chapter: string }[] = []
  chapters.forEach(ch => {
    ch.content.forEach((block: any) => {
      if (block.type === 'video' && block.video) {
        allVideos.push({ title: block.video.title, youtubeId: block.video.youtubeId, chapter: ch.title })
      }
    })
  })
  const brokenCount = Object.values(imageStatuses).filter(s => s === 'broken').length
  const okCount = Object.values(imageStatuses).filter(s => s === 'ok').length

  const checkAllImages = async () => {
    setChecking(true)
    clearBrokenImages()
    const statuses: Record<string, ImageStatus> = {}
    for (const img of allImages) {
      statuses[img.src] = 'loading'
    }
    setImageStatuses({ ...statuses })

    await Promise.all(allImages.map(img => {
      return new Promise<void>((resolve) => {
        const el = new Image()
        el.onload = () => { statuses[img.src] = 'ok'; setImageStatuses({ ...statuses }); resolve() }
        el.onerror = () => { statuses[img.src] = 'broken'; setImageStatuses({ ...statuses }); resolve() }
        el.src = overrides[img.src] || img.src
      })
    }))
    setChecking(false)
  }

  const saveOverride = (originalSrc: string) => {
    const newUrl = editingUrl[originalSrc]
    if (!newUrl?.trim()) return
    const updated = { ...overrides, [originalSrc]: newUrl.trim() }
    setOverrides(updated)
    localStorage.setItem('veritas_image_overrides', JSON.stringify(updated))
    setEditingUrl(prev => { const n = { ...prev }; delete n[originalSrc]; return n })
    // Re-check this image
    const el = new Image()
    el.onload = () => setImageStatuses(prev => ({ ...prev, [originalSrc]: 'ok' }))
    el.onerror = () => setImageStatuses(prev => ({ ...prev, [originalSrc]: 'broken' }))
    el.src = newUrl.trim()
  }
  const counts = { all: allImages.length + allVideos.length, images: allImages.length, videos: allVideos.length, broken: brokenCount }

  if (loading) return <div className="text-white/30 font-sans text-sm py-8 text-center">Loading media...</div>

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-xl font-bold text-white">Media Library</h1>
        <p className="font-sans text-xs text-white/30 mt-1">{allImages.length} images · {allVideos.length} videos</p>
      </div>

      {/* Health Dashboard */}
      <div className="bg-white/5 border border-white/5 rounded-lg p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50">Image Health Check</h3>
          <button
            onClick={checkAllImages}
            disabled={checking}
            className={`px-3 py-1.5 rounded font-sans text-xs transition-colors ${
              checking ? 'bg-white/5 text-white/20 cursor-wait' : 'bg-crimson/10 text-crimson hover:bg-crimson/20'
            }`}
          >
            {checking ? 'Checking...' : 'Check All Images'}
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-white/[0.02] rounded">
            <p className="font-serif text-2xl font-bold text-white">{allImages.length}</p>
            <p className="font-sans text-[10px] text-white/30">Total Images</p>
          </div>
          <div className="text-center p-3 bg-white/[0.02] rounded">
            <p className="font-serif text-2xl font-bold text-emerald-400">{okCount}</p>
            <p className="font-sans text-[10px] text-white/30">Working</p>
          </div>          <div className="text-center p-3 bg-white/[0.02] rounded">
            <p className={`font-serif text-2xl font-bold ${brokenCount > 0 ? 'text-red-400' : 'text-white/20'}`}>{brokenCount}</p>
            <p className="font-sans text-[10px] text-white/30">Broken</p>
          </div>
        </div>
        {/* Status dots */}
        {Object.keys(imageStatuses).length > 0 && (
          <div className="flex flex-wrap gap-1">
            {allImages.map((img, i) => {
              const status = imageStatuses[img.src]
              return (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-sm transition-colors ${
                    status === 'ok' ? 'bg-emerald-500' :
                    status === 'broken' ? 'bg-red-500' :
                    status === 'loading' ? 'bg-amber-500 animate-pulse' :
                    'bg-white/10'
                  }`}
                  title={`${img.alt} (${img.chapterId})`}
                />
              )
            })}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        {(['all', 'images', 'videos', 'broken'] as const).map(t => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-3 py-1.5 rounded font-sans text-xs tracking-wide transition-colors ${
              filter === t ? 'bg-crimson/10 text-crimson' : 'bg-white/5 text-white/30 hover:text-white/50'
            }`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} ({counts[t]})
          </button>
        ))}
      </div>
      {/* Image Grid */}
      {(filter === 'all' || filter === 'images' || filter === 'broken') && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allImages
            .filter(img => filter !== 'broken' || imageStatuses[img.src] === 'broken')
            .map((img, i) => {
              const status = imageStatuses[img.src]
              const isEditing = editingUrl[img.src] !== undefined
              return (
                <div key={i} className={`bg-white/5 border rounded-lg overflow-hidden ${
                  status === 'broken' ? 'border-red-500/30' : 'border-white/5'
                }`}>
                  <div className="aspect-video bg-white/[0.02] relative overflow-hidden">
                    <img
                      src={overrides[img.src] || img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).style.opacity = '0.1' }}
                    />
                    {status && (
                      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${
                        status === 'ok' ? 'bg-emerald-500' : status === 'broken' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'
                      }`} />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-sans text-xs text-white/70 line-clamp-2">{img.caption || img.alt}</p>
                    <p className="font-mono text-[9px] text-white/20 mt-1 truncate">{img.chapterId}</p>
                    <p className="font-mono text-[9px] text-white/10 mt-0.5 truncate">{img.credit}</p>                    {status === 'broken' && (
                      <div className="mt-2 space-y-2">
                        <a
                          href={`https://commons.wikimedia.org/w/index.php?search=${encodeURIComponent(img.alt)}`}
                          target="_blank" rel="noopener noreferrer"
                          className="font-sans text-[10px] text-crimson hover:text-crimson-light"
                        >
                          Find replacement on Wikimedia →
                        </a>
                        {isEditing ? (
                          <div className="flex gap-1">
                            <input
                              type="url"
                              value={editingUrl[img.src] || ''}
                              onChange={e => setEditingUrl(prev => ({ ...prev, [img.src]: e.target.value }))}
                              placeholder="New image URL..."
                              className="flex-1 px-2 py-1 bg-white/5 border border-white/10 rounded text-white font-mono text-[10px] focus:outline-none focus:border-crimson/30"
                            />
                            <button onClick={() => saveOverride(img.src)} className="px-2 py-1 bg-crimson/10 text-crimson font-sans text-[10px] rounded">Save</button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingUrl(prev => ({ ...prev, [img.src]: overrides[img.src] || '' }))}
                            className="font-sans text-[10px] text-white/20 hover:text-white/40"
                          >
                            Replace URL
                          </button>
                        )}
                      </div>
                    )}
                    {overrides[img.src] && (
                      <p className="font-mono text-[9px] text-amber-400/50 mt-1">⚡ Override active</p>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      )}
      {/* Video Grid */}
      {(filter === 'all' || filter === 'videos') && allVideos.length > 0 && (
        <>
          {filter === 'all' && <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-white/50 mt-2">Videos</h3>}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allVideos.map((vid, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${vid.youtubeId}`}
                    className="w-full h-full border-0"
                    title={vid.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="p-3">
                  <p className="font-sans text-xs text-white/70 line-clamp-1">{vid.title}</p>
                  <p className="font-mono text-[9px] text-white/20 mt-0.5">{vid.chapter}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
