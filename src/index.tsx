import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// browserRouter로 App 컴포넌트를 감싸줌으로써 라우팅 기능을 사용할 수 있게 해줌

root.render(
  <React.StrictMode>
    {/*<ProductProvider>  context 사용을 위해 사용 범위를 정함*/}
    <BrowserRouter> 
    <App />
    <CssBaseline/>
    </BrowserRouter>
   {/* </ProductProvider> */}
  </React.StrictMode> 
);
