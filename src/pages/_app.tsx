import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "../store/store";
// import "./globals.css";
import Script from "next/script";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import '../style/animate.min.css';
import '../style/aos.css';
import '../style/bootstrap.min.css';
import '../style/style.css';
import '../style/responsive.css';

function MyApp({ Component, pageProps }: AppProps) {
  // const { i18n } = useTranslation();

  // useEffect(() => {
  //   i18n.on("languageChanged", () => {
  //     document.documentElement.lang = i18n.language;
  //   });
  //   document.documentElement.lang = i18n.language;
  // }, [i18n]);
  return (
    // <ApolloProvider client={client}>
    <Provider store={store}>
      {/* <SessionProvider session={pageProps.session}> */}
      {/* <!-- Google tag (gtag.js) --> */}

      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-KZ4VSHLWE4"
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TB68GLL');
          `}
      </Script>

      {/* @ts-ignore */}
      <Component {...pageProps} />
      {/* </SessionProvider> */}
    </Provider>
    // </ApolloProvider>
  );
}

export default MyApp;
