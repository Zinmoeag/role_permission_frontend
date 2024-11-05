import AppRouter from "./router"
import { useAppStore } from "./store";
import AppError from "./utils/AppError";
import { StatusCode } from "./utils/Status";
import useHealtChecker from "./hooks/useHealtChecker";

function App() {

  const {
    state : {
      theme
    }
  } = useAppStore() as any;

  const {
    isPending, data, error
  } = useHealtChecker();

  if(isPending) return <p>Loading...</p>
  if(error) throw new AppError(StatusCode.InternalServerError, "server error")

  return (
    <>
      <main className={`${theme}`}>
        <div className="bg-white">
          <AppRouter />
          {/* <div id="confirm_modal">
            hey
          </div> */}
        </div>
      </main>
    </>
  )
}

export default App;
