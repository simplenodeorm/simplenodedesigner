import React from 'react';
import ReactDOM from 'react-dom';
import "../app/App.css";
import config from '../config/appconfig.json';
import {BaseDesignComponent} from './BaseDesignComponent';

const EventListenerMode = {capture: true};

class ModalDialog extends BaseDesignComponent {
    constructor(props) {
        super(props);
        this.onOk = this.onOk.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    
    componentDidMount () {
      const dom = ReactDOM.findDOMNode (this);
      dom.addEventListener ('mousedown', e => this.handleMouseDown (e));
    }
    
    onOk() {
        if (this.isComplete()) {
            this.clearModalContainer();
            this.props.onOk(this.getResult());
        }
    }
    
    onCancel() {
        this.clearModalContainer();
        this.props.onCancel();
    }
    
    isComplete() { return true; };
    getTititke() { return 'Modal Dialog'; };
    getResult() {};
    getContent() {
        return<h2>modal dialog</h2>;
    }
    
    handleMouseDown(e) {
        captureMouseEvents ();
        e.preventDefault ();
        e.stopPropagation ();
    }
}

function preventGlobalMouseEvents () {
  document.body.style['pointer-events'] = 'none';
}

function restoreGlobalMouseEvents () {
  document.body.style['pointer-events'] = 'auto';
}

function mousemoveListener (e) {
  e.stopPropagation ();
  // do whatever is needed while the user is moving the cursor around
}

function mouseupListener (e) {
  restoreGlobalMouseEvents ();
  document.removeEventListener ('mouseup',   mouseupListener,   EventListenerMode);
  document.removeEventListener ('mousemove', mousemoveListener, EventListenerMode);
  e.stopPropagation ();
}

function captureMouseEvents (e) {
  preventGlobalMouseEvents ();
  document.addEventListener ('mouseup',   mouseupListener,   EventListenerMode);
  document.addEventListener ('mousemove', mousemoveListener, EventListenerMode);
  e.preventDefault ();
  e.stopPropagation ();
}

export {ModalDialog};