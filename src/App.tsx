import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { router } from './router'
import { store } from './redux/store'

export function App(): React.ReactElement {
  return (
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
  )
}