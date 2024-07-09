import { StatusCode } from "./Status";

class AppError extends Error {
    errorMessage : string | undefined = undefined;
    constructor(status : StatusCode, message : string){
        super(message + " : " + status);
        this.errorMessage = message + " : " + status
        this.name = "AppError";
        (Error as any).captureStackTrace(this, this.constructor);
    }

    static BreakMessage(errorMessage : string) {
        return errorMessage.split(":").map((part) => {
            let isNum = Number(part.trim());
            if(isNum){
                return isNum;
            }else{
                return part.trim();
            }
        });
    }
}

export default AppError;