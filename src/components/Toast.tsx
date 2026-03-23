import { useAuth } from '../lib/AuthContext'

export default function Toast() {
  const { toast } = useAuth()
  if (!toast) return null

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] animate-fade-in">
      <div className="bg-ink text-white px-6 py-3 rounded-sm shadow-lg font-sans text-sm">
        {toast}
      </div>
    </div>
  )
}
