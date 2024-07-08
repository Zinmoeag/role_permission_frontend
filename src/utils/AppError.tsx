import { StatusCode } from "./Status";

class AppError extends Error {
    constructor(status : StatusCode, message : string){
        super(message);
        this.name = "AppError";
        (Error as any).captureStackTrace(this, this.constructor);
    }
}

export default AppError;