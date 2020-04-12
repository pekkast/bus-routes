import { render } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('<App>', () => {
    it('renders bus stop selects', () => {
        const { getByLabelText } = render(<App />);
        const startLabel = getByLabelText(/Alkupysäkki/i);
        expect(startLabel).toBeInTheDocument();
        const stopLabel = getByLabelText(/Loppupysäkki/i);
        expect(stopLabel).toBeInTheDocument();
    });
});