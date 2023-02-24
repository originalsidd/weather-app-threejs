import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Load from './components/Load';
import './index.css';
// import App from './App';

const App = React.lazy(() => import('./App'));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Suspense fallback={<Load desc={'App'} />}>
            <App />
        </Suspense>
    </>
);
