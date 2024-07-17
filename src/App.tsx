import AppRouter from "./router"
import { useAppStore } from "./store";

function App() {
  const {
    state : {
      theme
    }
  } = useAppStore() as any;

  return (
    <>
      <main className={theme}>
        <AppRouter />
      </main>
    </>
  )
}

export default App;
