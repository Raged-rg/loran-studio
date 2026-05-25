import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import GlobalStaticFallback from './components/GlobalStaticFallback.jsx'

console.log("LORAN STUDIO - main.jsx loaded and executing entry point!");

// Global safety error trackers to handle unexpected WebView runtime blocks
if (typeof window !== 'undefined') {
  window.onerror = function (message, source, lineno, colno, error) {
    console.error("Global captured error:", message, "at", source, lineno, colno);
    if (error) console.error(error.stack);
    return false; // Let it bubble up to the ErrorBoundary
  };

  window.addEventListener('unhandledrejection', function (event) {
    console.error("Global captured unhandled promise rejection:", event.reason);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<GlobalStaticFallback />}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
