import React from 'react';
import ReactDOM from 'react-dom';
import {LoginPage} from './LoginPage';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import localStorage from '../../__mocks__/localStorageMock';

window.localStorage = localStorage;

configure({ adapter: new Adapter() });

jest.mock('../config/orms.json', () => ([
    {
        "name" : "hr",
        "url"  : "http://localhost:8888/hrorm",
        "defaultUsername" : "user",
        "defaultPassword" : "pass"
    }
]));

it('initializes successfully', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LoginPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('login check',()=>
{
    let wrapper = shallow(<LoginPage/>);
    wrapper.find('select').simulate('change', {target: { name: 'orm', value : 'hr'}});
    let res = wrapper.state('orm');
    expect(res).toBeDefined();
    expect(res.name).toEqual('hr');
    wrapper.find('input[type="text"]').simulate('blur', {target: {name: 'password', value: 'pass'}});
    expect(wrapper.state('password')).toEqual('pass');
    wrapper.find('input[type="text"]').simulate('blur', {target: {name: 'username', value: 'user'}});
    expect(wrapper.state('username')).toEqual('user');
    wrapper.instance().login = jest.fn();
    wrapper.update();
    wrapper.find('form').simulate('submit', { preventDefault() {} });
    expect(wrapper.instance().login).toHaveBeenCalled();
});