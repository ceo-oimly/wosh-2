// Defensive polyfill for environments where window.fetch has only a getter
try {
  let currentFetch = window.fetch;
  if (typeof currentFetch === 'function') {
    try {
      Object.defineProperty(window, 'fetch', {
        configurable: true,
        enumerable: true,
        get: () => currentFetch,
        set: (fn: typeof fetch) => {
          currentFetch = fn;
        },
      });
    } catch {}
    try {
      if (typeof Window !== 'undefined' && Window.prototype) {
        Object.defineProperty(Window.prototype, 'fetch', {
          configurable: true,
          enumerable: true,
          get: () => currentFetch,
          set: (fn: typeof fetch) => {
            currentFetch = fn;
          },
        });
      }
    } catch {}
  }
} catch {}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
