import "@/styles/globals.css";
import { TeamsContextProvider } from "@/context/teamsContext";
// import Script from 'next/script'
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <TeamsContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TeamsContextProvider>
  );
}
