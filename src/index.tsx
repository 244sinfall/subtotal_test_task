import { createRoot } from 'react-dom/client';
import React from 'react';
import App from 'app';

const rootElement = document.querySelector('#root');

const root = createRoot(rootElement);

root.render(<App />);
