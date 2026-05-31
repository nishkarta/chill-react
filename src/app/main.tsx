import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/index.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './router'
import { Provider } from 'react-redux'
import { store } from '@app/store/redux/store'
import { ToastProvider } from '@shared/store/ToastProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <Provider store={store}>
        <RouterProvider router={routes} />
      </Provider>
    </ToastProvider>
  </StrictMode>,
)
