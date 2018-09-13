import React from 'react';
import AppRoot from './components/AppRoot';

class App {
    constructor() {
    }

    render (element) {
        // would be in JSX: <AppRoot state={this.state} />
        var appRootElement = React.createElement(AppRoot);

        // render to DOM
        if(element) {
          React.render(appRootElement, element);
          return;
        }
    }
}

export default App;
