import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import Button from "../index";
import {renderWithProviders} from "../../../testUtils/customRenderUtils";


describe('Button component', () => {
    test('renders button with label', () => {
        const label = 'Click me';
        renderWithProviders(<Button label={label} disabled={false} onClick={() => {}} />);
        const buttonElement = screen.getByText(label);
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick handler when button is clicked', () => {
        const onClickMock = jest.fn();
        renderWithProviders(<Button label="Click me" disabled={false} onClick={onClickMock} />);
        const buttonElement = screen.getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test('renders button as disabled when disabled prop is true', () => {
        renderWithProviders(<Button label="Click me" disabled={true} onClick={() => {}} />);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toBeDisabled();
    });
});
