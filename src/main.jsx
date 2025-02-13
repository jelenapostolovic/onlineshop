import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SingleProductPage from './pages/SingleProductPage.jsx'
import CartPage from './pages/CartPage.jsx'
import FavoritePage from './pages/FavoritePage.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { ClerkProvider } from '@clerk/clerk-react'
// Import Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

const router = createBrowserRouter([
  {
      path: '/',
      element: <App/>,
      errorElement: <div>Error Page</div>,
      children: [
        {
          path: '/',
          element: <HomePage/>
        },
        {
          path: '/singleProduct/:id',
          element: <SingleProductPage/>
        },
        {
          path: '/cart',
          element: <CartPage/>
        },
        {
          path: '/favorite',
          element: <FavoritePage/>
        }
      ]
}])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <RouterProvider router={router}/>
      </ClerkProvider>
    </Provider>
  </StrictMode>,
)
