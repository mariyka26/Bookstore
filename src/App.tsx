import { useState } from 'react'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { router } from './router'
import { LangContext, initialState as langInitialState } from './contexts/lang-context'
import type { LangType } from './types'
import { store } from './redux/store'

export function App(): React.ReactElement {
  const [lang, setLang] = useState<LangType>(langInitialState.lang)

  return (
    <Provider store={store}>
      <LangContext.Provider value={{ lang, setLang }}>
        <RouterProvider router={router} />
      </LangContext.Provider>
    </Provider>
  )
}