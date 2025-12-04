import React from 'react';
import ReactDOM from 'react-dom/client';
import KitchenSink from './KitchenSink';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <KitchenSink />
  </React.StrictMode>
);

