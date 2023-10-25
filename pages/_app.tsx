import { useState, useEffect } from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/Components/Theming/theme";
import createEmotionCache from "../src/createEmotionCache";
import "../style/global.css";
import Navigation from "../src/Components/Navigation";
import Footer from "../src/Components/Footer";
import Loading from "../src/Components/Loading/Loading";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Teen Tech Hub</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Teens Tech Hub" />
        <meta name="keywords" content="Teens Shop, Tech Hub, Tech Shop, Shop" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Navigation />
        {loading && (
          <div className="overlay">
            <img src="/images/logo.png" alt="Teen Tech Hub logo" />
            <Loading />
          </div>
        )}
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </CacheProvider>
  );
}
