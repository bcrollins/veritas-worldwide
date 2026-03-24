import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../../data/chapters'

export default function AdminContent() {
  const [search, setSearch] = useState('')

  const filtered = chapters.filter(ch =>
    ch.title.toLowerCase().includes(search.toLowerCase()) ||
    ch.id.toLowerCase().includes(search.toLowerCase())
  )

  const totalBlocks = chapters.reduce((sum, ch) => sum + ch.content.length, 0)
  const totalVideos = chapters.reduce((sum, ch) => sum + ch.content.filter(b => b.type === 'video').length, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold text-white">Content</h1>
          <p className="font-sans text-xs text-white/30 mt-1">
            {chapters.length} chapters · {totalBlocks} content blocks · {totalVideos} videos
          </p>
        </div>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search chapters..."
          className="w-56 pl-3 pr-3 py-2 bg-white/5 border border-white/10 rounded text-white font-sans text-xs focus:outline-none focus:border-crimson/30"
        />
      </div>

      <div className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
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
              const videoCount = ch.content.filter(b => b.type === 'video').length
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
                    <Link to={`/chapter/${ch.id}`} className="font-sans text-[10px] text-crimson hover:text-crimson-light tracking-wide">
                      Open →
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
