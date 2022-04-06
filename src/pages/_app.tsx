import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react';

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const instance = {} as any;
  //  createInstance({
  //   // urlBase: 'https://a.m4tt72.xyz',
  //   // trackerUrl: 'https://a.m4tt72.xyz/js/',
  //   // srcUrl: 'https://a.m4tt72.xyz/js/',
  //   // siteId: 1,
  //   // configurations: {
  //   //   setRequestMethod: 'GET',
  //   // },
  //   siteId: 1,
  //   urlBase: null,
  // });

  const onClickAnywhere = () => {
    inputRef.current.focus();
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <MatomoProvider value={instance}>
        <div
          className="text-xs text-light-foreground dark:text-dark-foreground min-w-max md:min-w-full md:text-base"
          onClick={onClickAnywhere}
        >
          <main className="w-full h-full p-2 bg-light-background dark:bg-dark-background">
            <Component {...pageProps} inputRef={inputRef} />
          </main>
        </div>
      </MatomoProvider>
    </>
  );
};

export default App;
