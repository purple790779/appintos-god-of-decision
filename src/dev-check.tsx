import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// Simple error display function that doesn't rely on React
function showFatalError(msg: string, details: any) {
    document.body.innerHTML = `
    <div style="padding: 20px; color: red; font-family: sans-serif;">
      <h1>Fatal Startup Error</h1>
      <p>The application failed to load.</p>
      <h3 style="background: #eee; padding: 10px;">${msg}</h3>
      <pre style="background: #f8d7da; padding: 10px; overflow: auto;">${JSON.stringify(details, Object.getOwnPropertyNames(details), 2)}</pre>
    </div>
  `;
}

console.log('Dev Check: Starting...');

const rootEl = document.getElementById('root');
if (!rootEl) showFatalError('Root element missing', {});

try {
    // Dynamically import App to catch module resolution errors
    import('./App')
        .then((module) => {
            console.log('Dev Check: App module loaded', module);
            const App = module.default;
            ReactDOM.createRoot(rootEl!).render(
                <React.StrictMode>
                    <App />
                </React.StrictMode>
            );
        })
        .catch((err) => {
            console.error('Dev Check: Failed to import App', err);
            showFatalError('Failed to import App.tsx', err);
        });
} catch (err) {
    showFatalError('Immediate Runtime Error', err);
}
