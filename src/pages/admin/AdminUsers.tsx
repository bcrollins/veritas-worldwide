import { useState, useEffect } from 'react'
import { getAllUsers } from '../../lib/adminAuth'

interface StoredUser {
  email: string
  displayName: string
  passwordHash: string
  createdAt: string
}

export default function AdminUsers() {
  const [users, setUsers] = useState<StoredUser[]>([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    setUsers(getAllUsers())
  }, [])

  const filtered = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.displayName.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (email: string) => {
    if (!confirm(`Remove user ${email}? This cannot be undone.`)) return
    const updated = users.filter(u => u.email !== email)
    localStorage.setItem('veritas_users', JSON.stringify(updated))
    setUsers(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-xl font-bold text-white">Users</h1>
          <p className="font-sans text-xs text-white/30 mt-1">{users.length} registered accounts</p>
        </div>
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-56 pl-8 pr-3 py-2 bg-white/5 border border-white/10 rounded text-white font-sans text-xs focus:outline-none focus:border-crimson/30"
          />
          <svg className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="bg-white/5 border border-white/5 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">User</th>
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Email</th>
              <th className="px-5 py-3 text-left font-sans text-[10px] tracking-widest uppercase text-white/30">Joined</th>
              <th className="px-5 py-3 text-right font-sans text-[10px] tracking-widest uppercase text-white/30">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr><td colSpan={4} className="px-5 py-12 text-center font-sans text-xs text-white/20">
                {search ? 'No users match your search' : 'No registered users yet'}
              </td></tr>
            ) : filtered.map((user, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-crimson/10 flex items-center justify-center">
                      <span className="font-sans text-xs font-bold text-crimson">{user.displayName.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-sans text-sm text-white/80">{user.displayName}</span>
                  </div>
                </td>
                <td className="px-5 py-3 font-mono text-xs text-white/40">{user.email}</td>
                <td className="px-5 py-3 font-sans text-xs text-white/30">{new Date(user.createdAt).toLocaleDateString()}</td>
                <td className="px-5 py-3 text-right">
                  <button
                    onClick={() => handleDelete(user.email)}
                    className="font-sans text-[10px] tracking-wide text-crimson/50 hover:text-crimson transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
