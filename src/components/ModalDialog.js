import React from 'react';
import ReactDOM from 'react-dom';
import "../app/App.css";
import config from '../config/appconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';

var clickFunction;
class ModalDialog extends BaseDesignComponent {
    constructor(props) {
        super(props);
                
        this.state = {
            error: ''
        };

        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    
    componentDidMount () {
        const me = this;
        clickFunction = function(e) { 
            if (me.isModalClick(e.target)) { 
                me.onClick(e);
            } else {
                e.stopImmediatePropagation(); 
            }
        };
            
        document.addEventListener('click', clickFunction, true);
    }
    
    onOk() {
        if (this.isComplete()) {
            this.clearModalContainer(clickFunction);
            this.props.onOk(this.getResult());
        } else {
            this.setState({error: 'Please complete all entries'});
        }
    }
    
    onCancel() {
        this.clearModalContainer(clickFunction);
        this.props.onCancel();
    }
    
    render() {
        return <div><h2>{this.getTitle()}</h2>{this.getContent()}
        {this.state.error && <div className="errorMessage">{this.state.error}</div>}
            <div className="buttonPanel">
                <button className="button" onClick={this.onOk}>Ok</button><button className="button" onClick={this.onCancel}>Cancel</button>
            </div>
        </div>;
    }
    
    isComplete() { return true; };
    getTitle() { return 'Modal Dialog'; };
    getResult() {};
    getContent() {
        return<h2>modal dialog</h2>;
    }
}

export {ModalDialog};