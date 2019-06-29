import React from 'react';
import {MemoryRouter} from 'react-router';
import {PrivateRoute} from '../auth/PrivateRoute';
import {mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {HomePage} from "../components/HomePage";
import {LoginPage} from "./LoginPage";
import {App} from "../app/App";
import localStorage from '../../__mocks__/localStorageMock';

window.localStorage = localStorage;

configure({ adapter: new Adapter() });

it('LoginPage route check',()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    localStorage.removeItem('orm');
    let wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><App /></MemoryRouter>);
    expect(wrapper.find(LoginPage)).toHaveLength(1);
    expect(wrapper.find(HomePage)).toHaveLength(0);
    wrapper.unmount();
    console.error = originalError;
});

it('HomePage route check', ()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    window.localStorage.setItem('orm', JSON.stringify({name: "test"}));
    let wrapper = mount(<MemoryRouter initialEntries={[ '/' ]}><PrivateRoute exact path="/" component={HomePage}/></MemoryRouter>);
    expect(wrapper.find(LoginPage)).toHaveLength(0);
    expect(wrapper.find(HomePage)).toHaveLength(1);
    wrapper.unmount();
    console.error = originalError;
});