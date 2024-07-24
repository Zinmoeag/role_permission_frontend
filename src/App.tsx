import { useEffect } from "react";
import AppRouter from "./router"
import { useAppStore } from "./store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { healthCheckApi } from "./api";
import AppError from "./utils/AppError";
import { StatusCode } from "./utils/Status";
import axiosClient from "./axios/axiosClient";
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
      <main className={theme}>
        <AppRouter />
      </main>
    </>
  )
}

export default App;
