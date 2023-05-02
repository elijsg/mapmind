import '2/styles/globals.css';
import type { AppProps } from 'next/app';
import './buttons.css';
import './Home.module.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
