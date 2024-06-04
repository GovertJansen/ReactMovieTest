import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App.tsx'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; 
import 'semantic-ui-css/semantic.min.css'; 

// Create a new instance of QueryClient
const queryClient = new QueryClient();

// Render the app to the root element in the HTML
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* Provide the QueryClient to the app */}
    <QueryClientProvider client={queryClient}>
      {/* Render the main App component */}
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
