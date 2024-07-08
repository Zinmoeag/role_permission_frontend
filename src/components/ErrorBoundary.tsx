import React from "react"

interface ErrorBoundaryProps {
    children : React.ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
    state = {hasError : false}

    static getDerivedStateFromError(error : any) {
        return {hasError : true};
    }

    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.log(error, info)
    }

    render(): React.ReactNode {
        if(this.state.hasError){
            return <>error</>
        }
        return this.props.children
    }
}

export default ErrorBoundary;