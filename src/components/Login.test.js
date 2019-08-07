import React from 'react';
import { shallow } from 'enzyme';
import Login from './Login';


describe('renders without crashing', () => {
    const login = (shallow(<Login />));
    it('snapshot login page', () => {
        expect(login).toMatchSnapshot()
    })
});
