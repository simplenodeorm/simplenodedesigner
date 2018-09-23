import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree'
import 'rc-tree/assets/index.css';
import "../app/App.css";
import orms from '../config/orms.json';
import config from '../config/appconfig.json';
import axios from 'axios';
import Spinner from './Spinner';


var contextMenu = document.createElement('div');
Object.assign(contextMenu.style, {
      position: 'absolute',
      visibility: 'hidden'});
contextMenu.className = 'popupMenu';
contextMenu.id = 'cmmdatatree';

if (!document.getElementById('cmmdatatree')) {
    document.body.appendChild(contextMenu);
}

        
var modelData;

class SelectModelDataPanel extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedKeys: '',
            loading: false,
            model: props.model,
            error: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ model: nextProps.model});
    }

    render() {
        const {model, loading, error} = this.state;
        if (model === config.modelselectdefault) {
            return <div className="panelPrompt1">{config.modelselectprompt}</div>
        } else if (error) {
            return <div className="errorMessage">{error}</div>
        } else if (loading) {
            return <div><Spinner/>Loading model hierarchy for model...</div>
        } else if (!loading && (model !== config.modelselectdefault)) {
            this.loadModelData(model);
        } else if (!loading && modelData) {
            return <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  onSelect={this.onSelect}
                  showLine
                  showIcon={true}
                >{modelData}</Tree></div>;
            }
    }
    
    onSelect (selectedKeys) {
        this.setState({ selectedKeys });
        this.clearContextMenu();
    }
  
    onRightClick(info) {
        contextMenu.style.top = info.event.pageY + 'px';
        contextMenu.style.left = info.event.pageX + 'px';
        contextMenu.style.visibility = 'visible';

        if (info.node.props.isLeaf) {
       //     ReactDOM.render(<ul><li><a href="#" onClick={editDocument}>Edit Document</a></li><li><a href="#" onClick={runDocument}>Run Document</a></li><li><a href="#" onClick={deleteDocument}>Delete Document</a></li></ul>, contextMenu);
        } else {
      //      ReactDOM.render(<ul><li><a href="#" onClick={addDocument}>Add Document</a></li></ul>, contextMenu);
        }
    }
    
    loadModelData(model) {
        const curcomp = this;
        const orm = JSON.parse(localStorage.getItem('orm'));
        const config = {
            headers: {'Authorization': orm.authString}
        };
        this.setState({loading: true});
        axios.get(orm.url + '/design/modeltree/' + model, config)
            .then((response) => {
                if (response.status === 200) {
                    curcomp.setState({loading: false});
                } else {
                    curcomp.setState({error: response.statusText, loading: false});
                }
            })
            .catch((err) => {
               curcomp.setState({error: ('' + err), loading: false});
            });     
        }
        
    clearContextMenu() {
        contextMenu.style.top = '-100px';
        contextMenu.style.left = '-100px';
        contextMenu.style.visibility = 'hidden';
    }

}

export {SelectModelDataPanel};