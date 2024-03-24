import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from "../index";

describe('Input', () => {
    const onChangeMock = jest.fn();

    test('renders Input component with label and value', () => {
        const label = 'Test Label';
        const value = 'Test Value';

        render(
            <Input
                label={label}
                value={value}
                onChange={onChangeMock}
            />
        );

        expect(screen.getByLabelText(label)).toBeInTheDocument();
        expect(screen.getByDisplayValue(value)).toBeInTheDocument();
    });

    test('calls onChange handler when input value changes', () => {
        const label = 'Test Label';
        const value = 'Test Value';
        const newValue = 'New Value';

        render(
            <Input
                label={label}
                value={value}
                onChange={onChangeMock}
            />
        );

        const inputElement = screen.getByLabelText(label) as HTMLInputElement;

        fireEvent.change(inputElement, { target: { value: newValue } });

        expect(onChangeMock).toHaveBeenCalledWith(expect.objectContaining({ target: { value: newValue } }));
    });

    test('renders Input component with default styling', () => {
        const label = 'Test Label';
        const value = 'Test Value';

        render(
            <Input
                label={label}
                value={value}
                onChange={onChangeMock}
            />
        );

        expect(screen.getByTestId('input-root')).toHaveStyle({
            width: '200px',
            color: '#bdbdbd',
        });
    });

    test('changes input border color on hover', () => {
        const label = 'Test Label';
        const value = 'Test Value';

        render(
            <Input
                label={label}
                value={value}
                onChange={onChangeMock}
            />
        );

        const inputElement = screen.getByLabelText(label);

        // Simulate mouse hover on the input element
        fireEvent.mouseEnter(inputElement);

        // Check if the input border color changes on hover
        expect(inputElement).toHaveStyle({
            borderColor: '#315cfd',
        });
    });

});
