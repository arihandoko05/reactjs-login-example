import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('renders without crashing', () => {
    const app = (shallow(<App />));
    it('snapshot app page', () => {
        expect(app).toMatchSnapshot()
    })
});
