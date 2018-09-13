import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SplitPane from 'react-split-pane';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <SplitPane split="vertical" minSize={50} defaultSize={100}>
         <div></div>
        <div></div>
    </SplitPane>, document.getElementById('root'));
registerServiceWorker();
