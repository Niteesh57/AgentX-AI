import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Suppress Three.js benign deprecation warnings (e.g. THREE.Clock)
if (typeof window !== 'undefined') {
  const origWarn = console.warn;
  console.warn = (...args: any[]) => {
    if (typeof args[0] === 'string' && (args[0].includes('THREE.Clock') || args[0].includes('THREE.WebGLRenderer: Context Lost'))) {
      return;
    }
    origWarn.apply(console, args);
  };
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
