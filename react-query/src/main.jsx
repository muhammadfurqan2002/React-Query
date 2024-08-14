import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Products from './components/Products.jsx'
import Product from './components/Product.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const route = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/products/:productId',
    element: <Product />
  }
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  <QueryClientProvider client={queryClient}>
    <RouterProvider router={route}>
      <App />
    </RouterProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  // </React.StrictMode>,
)
