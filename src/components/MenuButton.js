import React from 'react';
import Spinner from './Spinner';
import {SaveButton} from './SaveButton';
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
        const {text, error, loading} = this.state;
        return <div className="menuButton">
                {loading && <Spinner /> }
                {!loading && <SaveButton disabled={this.props.saveDisabled} onSave={this.props.onSave}/> }
                <a disabled={loading} onClick={this.props.onMenuClick}>
                    <svg viewBox="0 -4 24 26">
                        <path focusable="false" color="blue" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg><span>{text}</span>
                    </a>{error && <div className="errorMessage">{error}</div> }
            </div>;
    }
}

export {MenuButton};


