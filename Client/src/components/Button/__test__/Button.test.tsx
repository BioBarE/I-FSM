import React from 'react';
import {render, fireEvent, getByText, screen} from '@testing-library/react';
import Button from "../index";


describe('Button component', () => {
    test('renders button with label', () => {
        const label = 'Click me';
        render(<Button label={label} disabled={false} onClick={() => {}} />);
        const buttonElement = screen.getByText(label);
        expect(buttonElement).toBeInTheDocument();
    });

    test('calls onClick handler when button is clicked', () => {
        const onClickMock = jest.fn();
        const { getByText } = render(<Button label="Click me" disabled={false} onClick={onClickMock} />);
        const buttonElement = screen.getByText('Click me');
        fireEvent.click(buttonElement);
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });

    test('renders button as disabled when disabled prop is true', () => {
        const { getByText } = render(<Button label="Click me" disabled={true} onClick={() => {}} />);
        const buttonElement = screen.getByText('Click me');
        expect(buttonElement).toBeDisabled();
    });
});
