import { StatusCode } from "./Status";
import { AxiosError } from "axios";

class AppError extends Error {
  public statusCode: StatusCode = StatusCode.InternalServerError;
  errorMessage: string | undefined = undefined;
  constructor(status: StatusCode, message: string) {
    super(message + " : " + status);
    this.errorMessage = message + " : " + status;
    this.name = "AppError";
    this.statusCode = status;

    (Error as any).captureStackTrace(this, this.constructor);
  }
}

export const AxiosErrorToAppError = (error: AxiosError) => {
  switch (error.response?.status) {
    case StatusCode.NotFound:
        return new AppError(StatusCode.NotFound, error.message);
    case StatusCode.Unauthorized:
      return new AppError(StatusCode.Unauthorized, error.message);
    case StatusCode.Forbidden:
      return new AppError(StatusCode.Forbidden, error.message);
    default:
      return new AppError(StatusCode.InternalServerError, error.message);
  }
};

export default AppError;
