import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import React from 'react';
import ReactDOM from 'react-dom';
import System from './System';

import 'primereact/resources/themes/nova-accent/theme.css';
import 'primereact/resources/primereact.css';

import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@fullcalendar/common/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

import './layout/layout.scss';
import 'react-block-ui/style.css';

import {Provider} from 'react-redux';
import {store, persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Router} from 'react-router-dom'
import history from './routes/history';

ReactDOM.render(  
    <Provider store={store}>
    <PersistGate persistor={persistor}>
        <Router history={history}>   
              <System />                   
        </Router>
    </PersistGate>          
</Provider>, 
document.getElementById('root'));
