'use client'

import { Component, type ErrorInfo, type ReactNode } from 'react'
import { Button } from './Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-error bg-error/10 p-6 text-center">
            <h2 className="mb-2 text-lg font-semibold text-error">
              Something went wrong
            </h2>
            <p className="mb-4 text-sm text-error/80">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button
              variant="outline"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
            >
              Try again
            </Button>
          </div>
        )
      )
    }

    return this.props.children
  }
}