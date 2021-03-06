import { unstable_createRoot } from 'react-dom';
import { App } from './app';
// import './services/ga';

const rootEl = document.getElementById('app-root');
if (rootEl !== null) {
  rootEl.innerHTML = '';
  const root = unstable_createRoot(rootEl);
  root.render(<App />);
}
