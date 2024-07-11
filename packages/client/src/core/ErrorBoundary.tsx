import {
  Component,
  ComponentType,
  ReactNode,
  createElement,
} from 'react'

type FallbackProps = {
  resetErrorBoundary?: () => void
}

type Props = {
  FallbackComponent: ComponentType<FallbackProps>
  children?: ReactNode
  onError?: (info: ErrorInfo) => void
}

type ErrorInfo = {
  error?: unknown
  errorInfo?: unknown
}

type State = {
  hasError: boolean
} & ErrorInfo

const initialState = {
  hasError: false,
  error: null,
  errorInfo: null,
}

class ErrorBoundary extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props)
    this.state = initialState
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static getDerivedStateFromError(
    _: Error
  ): State {
    return { hasError: true }
  }

  componentDidCatch(
    error: unknown,
    errorInfo: unknown
  ) {
    const onError = this.props.onError

    if (onError) {
      onError({ error, errorInfo })
    }
  }

  resetErrorBoundary() {
    this.setState(initialState)
  }

  render() {
    const fallbackProps: FallbackProps = {
      resetErrorBoundary:
        this.resetErrorBoundary.bind(this),
    }
    if (this.state.hasError) {
      return createElement(
        this.props.FallbackComponent,
        fallbackProps
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
