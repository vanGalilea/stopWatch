import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {TimerStore} from './TimerStore';
import {useStrict} from 'mobx';

useStrict(true);

const timerStore = new TimerStore();

ReactDOM.render(
    <App timerStore={timerStore} />,
    document.getElementById('root')
);

registerServiceWorker();
