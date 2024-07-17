import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthUserProvider from './context/authUserProvider.tsx';
import AppStoreProvider from './store/store.tsx';
import { CookiesProvider } from 'react-cookie';
// import ErrorBoundary from './components/ErrorBoundary.tsx';
import AppErrorBoundary from './components/AppErrorBoundary.tsx';
import LocalizationProvider from './context/LocalizationProvider.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider defaultSetOptions={{path : "/"}}>
      <QueryClientProvider client={queryClient}>
          <AppErrorBoundary>
            <AppStoreProvider>
                <LocalizationProvider>
                  <AuthUserProvider>
                      <App />
                      <ReactQueryDevtools initialIsOpen={false} />
                  </AuthUserProvider>
                </LocalizationProvider>
            </AppStoreProvider>
          </AppErrorBoundary>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
)
