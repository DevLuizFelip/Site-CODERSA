import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';
export function render(pathname) { return renderToString(<StaticRouter location={pathname}><App/></StaticRouter>); }
