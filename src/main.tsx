import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';1
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AuthUserProvider from './context/authUserProvider.tsx';
import AppStoreProvider from './store/store.tsx';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppStoreProvider>
          <AuthUserProvider>
            <App />
          </AuthUserProvider>
        </AppStoreProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)
