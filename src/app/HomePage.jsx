import React from 'react';
import './App.css';
import SplitPane from 'react-split-pane';
import DocumentTree from './DocumentTree';
import DesignTabs from './DesignTabs';
import AppToolbar from './AppToolbar';

import authUserService from '../auth/authUserService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        };
    }

    componentDidMount() {
        this.setState({
            user: JSON.parse(localStorage.getItem('user')),
            users: {loading: true}
        });
    }

    render() {
        const {user, users} = this.state;
        return (
                <div><br /><hr /><AppToolbar/><SplitPane 
                        split="vertical" 
                        minSize={10} 
                        defaultSize={100}>
                        <DocumentTree/>
                        <DesignTabs/>
                    </SplitPane></div>
                );
    }
}

export { HomePage };