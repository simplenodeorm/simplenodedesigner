import React from 'react';
import {AggregateFunctionSelect} from './AggregateFunctionSelect';
import {shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

document.designData = {};
document.designData.selnodes = [{type: 'VARCHAR'}, {type: 'DATE'}, {type: 'NUMBER'}];

it('test functionality',()=>
{
    const originalError = console.error;
    console.error = jest.fn();
    let wrapper = shallow(<AggregateFunctionSelect index={2}/>);
    let numberFunctions = ['avg', 'count', 'min', 'max', 'sum'];
    wrapper.instance().functions = numberFunctions;
    wrapper.find('select').simulate('change', { target: {selectedIndex: 2, options: [{value: 'avg'}, {value: 'count'}, {value: 'min'}]} });
    expect(document.designData.selnodes[2].__selectedFunction).toEqual('min');
    console.error = originalError;
});
