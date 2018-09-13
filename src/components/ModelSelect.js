import React from 'react';
import '../app.css';
import ReactList from 'react-list';
var models;
function ModelSelect() {
    models = loadModels();
    return <div style={{height: '100%', overflow: 'auto'}}>
        <ReactList
        length={models.length}
        itemRenderer={renderItem}
        type="uniform"
        data={models}
        />
        </div>
}

function renderItem(index, key) {
    return <div key={key}>{models[index]}</div>;
}

function loadModels() {
    return ["aaa", "bbb", "ccc"];
}

export default ModelSelect;