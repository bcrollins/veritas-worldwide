import { Component, type ReactNode, type ErrorInfo } from 'react'
import { Link } from 'react-router-dom'

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
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="font-sans text-[0.6rem] font-bold tracking-[0.2em] uppercase text-crimson mb-6">
            Something Went Wrong
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            Unexpected Error
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-crimson" />
            <p className="font-body text-lg italic text-ink-muted">
              We encountered an issue loading this page.
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
              className="font-sans text-sm font-semibold px-6 py-3 bg-crimson text-white rounded-sm hover:bg-crimson-dark transition-colors"
            >
              Reload Page
            </button>
            <Link
              to="/"
              onClick={() => this.setState({ hasError: false, error: null })}
              className="font-sans text-sm font-semibold px-6 py-3 border border-border text-ink rounded-sm hover:border-crimson hover:text-crimson transition-colors"
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
