import React from 'react';
import {screen, fireEvent } from '@testing-library/react';
import Input from "../index";
import {renderWithProviders} from "../../../testUtils/customRenderUtils";

describe('Input', () => {
    const onChangeMock = jest.fn();

    test('renders Input component with label and value', () => {
        const label = 'Test Label';
        const value = 'Test Value';

        renderWithProviders(
            <Input
                label={label}
                value={value}
                onChange={onChangeMock}
            />
        );

        expect(screen.getByLabelText(label)).toBeInTheDocument();
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    test('calls onChange handler when input value changes', async () => {
        const label = 'Test Label';
        let value = 'Test Value';
        const newValue = 'New Value';

        const onChange = jest.fn((event) => {
            value = event.target.value;
        });

        renderWithProviders(
            <Input
                label={label}
                value={value}
                onChange={onChange}
            />
        );

        const inputElement = screen.getByTestId(`input-${label}`);
        fireEvent.change(inputElement, { target: { value: newValue } });

        expect(value).toBe(newValue);
    });

    test('renders Input component with default styling', () => {
        const label = 'Test Label';
        const value = 'Test Value';

        renderWithProviders(
            <Input
                label={label}
                value={value}
                onChange={onChangeMock}
            />
        );

        expect(screen.getByTestId(`text-field-input-${label}`)).toHaveStyle({
            width: '200px',
            color: '#bdbdbd',
        });
    });
});
