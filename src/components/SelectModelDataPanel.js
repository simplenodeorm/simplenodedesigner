import React from 'react';
import ReactDOM from 'react-dom';
import Tree, { TreeNode } from 'rc-tree'
import 'rc-tree/assets/index.css';
import "../app/App.css";
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
        const model = this.state;
        if ((nextProps.model !== config.modelselectdefault)
            && (model !==  nextProps.model)) {
            this.loadModelData(nextProps.model);
        }
    }

    render() {
        const {model, loading, error} = this.state;
        let content;
        if (error) {
            return <div className="errorMessage">{error}</div>
        } else if (model === config.modelselectdefault) {
            return <div className="panelPrompt1">{config.modelselectprompt}</div>
        } else if (loading) {
            return <div><Spinner/>Loading model hierarchy for model...</div>
        } else if (modelData) {
            return <div className="treeContainer">
                <Tree 
                  onRightClick={this.onRightClick}
                  onSelect={this.onSelect}
                  showLine
                  showIcon={true}
                >{content}</Tree></div>;
        } else {
            return <div className="panelPrompt1">{config.modelselectprompt}</div>
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
        const inputModel = model
        const config = {
            headers: {'Authorization': orm.authString}
        };
        this.setState({loading: true});
        axios.get(orm.url + '/design/modeltree/' + inputModel, config)
            .then((response) => {
                if (response.status === 200) {
                    
                    const fieldLoop = (data) => {
                        if (data.fields) {
                            return data.fields.map((field) => {
                                return <TreeNode title={field.fieldName} key={field.__key__} isLeaf={true}/>

                            });
                        }
                    };

                    const relationshipLoop = (data) => {
                        if (data.relationships) {
                            return data.relationships.map((rel) => {
                            return <TreeNode title={rel.fieldName} key={rel.__key__} isLeaf={false}>{fieldLoop(rel)} {relationshipLoop(rel)}</TreeNode> });
                        } else if (data.fields) {
                            return <TreeNode title={data.objectName} key={data.__key__} isLeaf={false}>{fieldLoop(data)}</TreeNode>
                        }        
                    };
                    modelData = relationshipLoop(response.data);
                    curcomp.setState({loading: false, model: inputModel});
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