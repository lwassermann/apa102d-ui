import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';
import './polyfills';

ReactDOM.render(React.createElement(App, null, null),
                document.getElementById('root'));
