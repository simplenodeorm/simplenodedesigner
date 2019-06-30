import React from 'react';
import {AddFilterColumn} from './AddFilterColumn';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
;
document.designData = {};
document.designData.selnodes = [{__path__: 'path1'}];

it('test functionality',()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    let testAddFunc = jest.fn();
    let testColumnChange = jest.fn();
    let wrapper = shallow(<AddFilterColumn addColumn={testAddFunc} onColumnChange={testColumnChange}/>);
    wrapper.instance().onChange = jest.fn();
    wrapper.update();
    wrapper.find('select').simulate('change', { target: {} });
    wrapper.find('button').simulate('click', { preventDefault() {} });
    expect(testAddFunc).toHaveBeenCalled();
    console.error = originalError;
});