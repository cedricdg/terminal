import { useMatomo } from '@datapunt/matomo-tracker-react';
import { NextPageContext } from 'next';
import Head from 'next/head';
import React from 'react';
import packageJson from '../../package.json';
import { getQuote } from '../api';
import { History } from '../components/history';
import { Input } from '../components/input';
import { useHistory } from '../hooks/history';
import { banner } from '../utils/bin';

interface IndexPageProps {
  version: string;
  quote: string;
  inputRef: React.MutableRefObject<HTMLInputElement>;
}

const IndexPage: React.FC<IndexPageProps> = ({ version, quote, inputRef }) => {
  const containerRef = React.useRef(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([]);

  const init = React.useCallback(() => setHistory(banner()), []);

  React.useEffect(() => {
    init();
  }, [init]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>Cedric Deege | Home</title>
      </Head>

      <div className="h-full p-8 overflow-hidden border-2 rounded border-light-yellow dark:border-dark-yellow">
        <div ref={containerRef} className="h-full overflow-y-auto">
          <History history={history} />

          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
          />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps(context: NextPageContext) {
  const { quote } = await getQuote();

  return {
    props: {
      version: packageJson.version,
      quote,
    },
    revalidate: true,
  };
}

export default IndexPage;
