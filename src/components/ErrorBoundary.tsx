import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Link } from 'react-router-dom'
import { reportClientError } from '../lib/clientErrorReporting'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, errorInfo)
    reportClientError({
      message: error.message,
      name: error.name,
      stack: error.stack || '',
      componentStack: errorInfo.componentStack || '',
      source: 'ErrorBoundary',
      path: typeof window !== 'undefined' ? window.location.pathname : '',
    })
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-6">
            Veritas Worldwide
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            Unexpected Error
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-crimson" />
            <p className="font-body text-lg italic text-ink-muted">
              This archive page failed to load. The issue is technical — not a change to the public record.
            </p>
            <div className="h-[1px] w-12 bg-crimson" />
          </div>
          {this.state.error && (
            <p className="font-mono text-xs text-ink-faint bg-parchment-dark/30 border border-border rounded-sm p-4 mb-8 max-w-md mx-auto text-left overflow-auto">
              {this.state.error.message}
            </p>
          )}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null })
                window.location.reload()
              }}
              className="inline-flex min-h-[44px] items-center justify-center font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2"
            >
              Reload Page
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="inline-flex min-h-[44px] items-center justify-center font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-2"
            >
              Return to The Record
            </Link>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}
