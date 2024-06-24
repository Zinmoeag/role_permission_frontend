import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const ErrorComponent = ({
    errorMessage
}: {
    errorMessage : string
}) => {
    return (
        <>
            <div className="bg-red-200 flex items-center justify-center text-red-700 gap-2">
                <FontAwesomeIcon icon={faTriangleExclamation} />
                <p className="text-red-500 text-sm py-1">{errorMessage}</p>
                <FontAwesomeIcon icon={faTriangleExclamation} />
            </div>
        </>
    )
}

export default ErrorComponent;