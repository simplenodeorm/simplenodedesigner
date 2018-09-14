import React from 'react';
import './ModelSelect.css';
import ReactList from 'react-list';

var models;

function ModelSelect() {
    models = loadModels();
    return <div class="selectList"><ReactList length={200} itemRenderer={renderItem} type="uniform"/></div>;
}

function renderItem(index, key) {
    return <div key={key}>{index}</div>;
}

function loadModels() {
    return ["aaa", "bbb", "ccc"];
}

export default ModelSelect;