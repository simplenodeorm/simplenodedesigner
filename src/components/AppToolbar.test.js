import React from 'react';
import {AppToolbar} from './AppToolbar';
import {configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from "../../__mocks__/localStorageMock";
import ReactDOM from "react-dom";

configure({ adapter: new Adapter() });

window.localStorage = localStorage;

jest.mock('../config/orms.json', () => ([
    {
        "name" : "hr",
        "url"  : "http://localhost:8888/hrorm",
        "defaultUsername" : "user",
        "defaultPassword" : "pass"
    }
]));

it('initializes successfully', () => {
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.setItem('orm', JSON.stringify({name: 'hr'}));
    const div = document.createElement('div');
    ReactDOM.render(<AppToolbar />, div);
    ReactDOM.unmountComponentAtNode(div);
    console.error = originalError;
});