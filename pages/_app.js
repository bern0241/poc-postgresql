import '@/styles/globals.css'
import { TeamsContextProvider } from '@/context/teamsContext'
// import Script from 'next/script'

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <TeamsContextProvider>
      <Component {...pageProps} />
    </TeamsContextProvider>
  )
}