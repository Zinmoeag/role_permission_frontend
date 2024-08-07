import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {

  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1)
  }

  return (
    <section className="bg-white">
      <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
        <div className="flex flex-col items-center max-w-sm mx-auto text-center">
          <p className="p-3 text-[3rem] font-medium text-red-500 rounded-full">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-gray-800">
            hmmm!
          </h1>
          <p className="mt-4 text-gray-500">
            404 | Page Not Found
          </p>
          <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
            <button className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
              <Link to="/">Take me home</Link>
            </button>

            <button 
            onClick={handleGoBack}
            className="w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto hover:bg-blue-600">
              Go back
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;