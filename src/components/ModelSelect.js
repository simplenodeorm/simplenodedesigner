import React from 'react';
import Dropdown  from 'react-simple-dropdown';
import orms from '../config/orms.json';
import config from '../config/appconfig.json';
import axios from 'axios';
import Spinner from './Spinner';

var DropdownTrigger = Dropdown.DropdownTrigger;
var DropdownContent = Dropdown.DropdownContent;

const loop = (data) => {
    return data.map((modelname) => {
    if (modelname) {
        return <li><a href="#" onClick="this.setState('selection', {modelname})">{modelname}</a></li>;
    }
});

class ModelSelect extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedModel: 'Select model...',
            models: '',
            error: '',
            loading: false
        }
    }
    
    render() {
        const {models, selectedModel} = this.state;
        <Dropdown>
            <DropdownTrigger>Profile</DropdownTrigger>
            <DropdownContent>
            {loading && <Spinner/>}<img src="avatar.jpg" /> {selectedModel}
                <ul>
                    {loop(models)}
                </ul>
            </DropdownContent>
        </Dropdown>);
    }

    getOrm() {
        let retval;
        let ormname = localStorace.getItem('orm');

        for (let i = 0; i < orms.length; ++i) {
            if (ormname === orms[i].name) {
                retval = orms[i];
            }
        }

        return retval;
    }

    loadModels() {
        const curcomp = this;
        const instance = axios.create({baseURL: orm.url});
        instance.get('/design/modelnames', config)
                .then((response) => {
                    if (response.status === 200)) {
                        curcomp.setState('models' : loop(response.data));   
                    } else {
                        curcomp.setState({error: response.statusText, loading: false});
                    }
                })
                .catch((err) => {
                    curcomp.setState({error: err.toString(), loading: false});
                });        
    }
}


export {ModelSelect};