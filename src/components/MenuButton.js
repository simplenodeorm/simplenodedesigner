import React from 'react';
import Spinner from './Spinner';
import {SaveButton} from './SaveButton';
import {RunButton} from './RunButton';
import {HelpButton} from './HelpButton';
import "../app/App.css";

class MenuButton extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            text: props.text,
            error: props.error,
            message: props.message,
            loading: false
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ text: nextProps.text, error:  nextProps.error, loading: nextProps.loading, message: nextProps.message});
    }

    render() {
        const {text, error, message, loading} = this.state;
        this.state.error = '';
        return <div className="menuButton">
                {loading && <Spinner /> }
                {!loading && <SaveButton disabled={this.props.saveDisabled} onSave={this.props.onSave}/>}
                <a disabled={loading} onClick={this.props.onMenuClick}>
                    <svg viewBox="0 -4 24 26">
                        <path focusable="false" color="blue" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
                        </svg><span>{text}{error && <span className="errorMessage"> *{error}</span> }
                        {message && <span className="infoMessage"> {message}</span> }</span>
                    </a><RunButton disabled={this.props.runDisabled} onRun={this.props.onRun}/><HelpButton onHelp={this.props.onHelp}/>
            </div>;
    }
}

export {MenuButton};


