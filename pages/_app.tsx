import '../styles/globals.css'
import type { AppProps /*, AppContext */ } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <UserProvider>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </UserProvider>
      </PersistGate>
    </ReduxProvider>
  )
}

export default MyApp
