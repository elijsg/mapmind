import '2/styles/globals.css';
import type { AppProps } from 'next/app';
import '../CSS/buttons.css';
import '../CSS/app.module.css';
import  GlobalStateProvider  from '../context/GlobalStateContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-900 to-black text-white">
        <Component {...pageProps} />
      </div>
    </GlobalStateProvider>
  );
}

export default MyApp;