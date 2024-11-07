import { Component, ErrorInfo, ReactNode } from "react";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";
import IntertnalServerError from "../pages/errors/global/InternalServerError";
import ErrorHandler from "../utils/ErrorHandler";
interface AppErrorBoundaryWithChildren {
  children: ReactNode;
}

class AppErrorBoundary extends Component<AppErrorBoundaryWithChildren> {
  state: {
    hasError: boolean;
    error: null | Error;
  };

  constructor(props: AppErrorBoundaryWithChildren) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ error });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.state.error) {
        if (this.state.error instanceof AppError) {
          return <ErrorHandler statusCode={this.state.error.statusCode} />;
        }
        // const ErrorStatus = this.state.error.response?.status
        // return <ErrorHandler statusCode={ErrorStatus as StatusCode} />
      }

      return <>error</>;
    }
    return this.props.children;
  }
}

export default AppErrorBoundary;
