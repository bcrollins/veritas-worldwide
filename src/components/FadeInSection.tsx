import type { ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

export default function FadeInSection({ children, className = '' }: { children: ReactNode; className?: string }) {
  const { ref, isVisible } = useInView()
  return (
    <div
      ref={ref}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
