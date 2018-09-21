import React from 'react';
import Spinner from './Spinner';
import "../app/App.css";

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: props.text,
            error: props.error,
            loading: false
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.text, error:  nextProps.error, loading: nextProps.loading});
    }

    render() {
        let btn = this;
        const {text, error, loading} = this.state;
        return <div className="menuButton">
                {loading && <Spinner /> }
                <a href="#" disabled={loading} onClick={this.props.onMenuClick}>
                    <svg viewBox="0 0 24 24">
                        <path focusable="false" color="blue" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg>{text}
                    </a>{error && <div className="errorMessage">{error}</div> }
            </div>;
    }
}

export {MenuButton};


