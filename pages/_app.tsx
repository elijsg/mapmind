import type { AppProps } from 'next/app';

import '../CSS/buttons.css';
import '../CSS/app.module.css';
import  GlobalStateProvider  from '../context/GlobalStateContext';
import '../styles/globals.css'; 


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalStateProvider>
      <Component {...pageProps} />
    </GlobalStateProvider>
  );
}


export default MyApp;