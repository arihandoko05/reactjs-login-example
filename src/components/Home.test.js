import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';


describe('renders without crashing', () => {
    const home = (shallow(<Home />));
    it('snapshot home page', () => {
        expect(home).toMatchSnapshot()
    })
});
