import React from 'react';
import { screen } from '@testing-library/react';
import Label from "../index";
import {renderWithProviders} from "../../../testUtils/customRenderUtils";

describe('Label Component', () => {
    test('renders label text correctly', () => {
        const labelText = 'Test Label';
        renderWithProviders(<Label text={labelText} />);
        const labelElement = screen.getByText(labelText);
        expect(labelElement).toBeInTheDocument();
    });

    test('renders label with default color when no error', () => {
        const labelText = 'Test Label';
        renderWithProviders(<Label text={labelText} />);
        const labelElement = screen.getByText(labelText);
        expect(labelElement).toHaveStyle({ color: '#bdbdbd' });
    });

    test('renders label with error color when isError is true', () => {
        const labelText = 'Error Label';
        renderWithProviders(<Label text={labelText} isError={true} />);
        const labelElement = screen.getByText(labelText);
        expect(labelElement).toHaveStyle({ color: '#ff6a85' });
    });
});
