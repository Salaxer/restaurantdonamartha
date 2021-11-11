import React from 'react';
import ReactDOM from 'react-dom';

import App from './routes/App';

import { Provider } from 'react-redux';

import store from './initializers/store';

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
