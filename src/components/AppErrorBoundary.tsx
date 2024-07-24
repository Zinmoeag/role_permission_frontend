import { Component, ErrorInfo, ReactNode } from "react";
import AppError from "../utils/AppError";
import { StatusCode } from "../utils/Status";
import IntertnalServerError from "../pages/errors/global/InternalServerError";
interface AppErrorBoundaryWithChildren {
    children : ReactNode
}

class AppErrorBoundary extends Component<AppErrorBoundaryWithChildren> {

    state: {
        hasError : boolean,
        error : null | Error
    };

    constructor(props : AppErrorBoundaryWithChildren) {
        super(props);
        this.state = {
            hasError : false,
            error : null,
        }
    }

    static getDerivedStateFromError(error : any) {
        // console.log(error)
        return {hasError : true, error};
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        // console.log(errorInfo)
    }

    render(): ReactNode {
        if(this.state.hasError){
            if(this.state.error){
                // console.log(this.state)
                const ErrorStatus = AppError.BreakMessage(this.state.error.message)[1]
                switch(ErrorStatus){
                    case StatusCode.InternalServerError :
                        return <IntertnalServerError />
                }
            }
            
            return <>error</>
        }
        return this.props.children
    }
}

export default AppErrorBoundary;