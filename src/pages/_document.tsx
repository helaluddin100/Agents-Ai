import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { useEffect } from "react";

const Document = () => {
  // @ts-ignore
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then(
          (registration) => {
            console.log("SW registered: ", registration);
          },
          (registrationError) => {
            console.log("SW registration failed: ", registrationError);
          }
        );
      });
    }
  }, []);

  return (
    <Html>
      {" "}
      <title>Cutting-Edge AI Agent Solutions | Agents.AI</title>
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter&display=swap"
        />

        <meta
          name="title"
          content="Cutting-Edge AI Agent Solutions | Agents.AI"
        />
        <meta
          name="description"
          content="Discover the transformative power of AI agent technology for your business. Agents.AI offers advanced AI agent solutions that streamline operations, enhance customer experiences, and drive growth. Unlock the potential of artificial intelligence to revolutionize your business today."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" type="image/ico" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/ico" sizes="16x16" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <Script id="1">
          {
            "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-TB68GLL');"
          }
        </Script>
      </Head>
      {/* you can apply global style to entire document from here like*/}
      <body className="">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TB68GLL"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <div className="">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
};

export default Document;
