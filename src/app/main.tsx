import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './router'
import { Provider } from 'react-redux'
import { store } from '@app/store/redux/redux'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
    </Provider>
  </StrictMode>,
)
