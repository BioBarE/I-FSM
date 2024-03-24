import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import Checkbox from "../index";

describe('Checkbox', () => {
    test('renders checkbox with label', () => {
        const label = 'Checkbox Label';
        const { getByText } = render(<Checkbox label={label} checked={false} onChange={() => {}} />);
        const checkboxLabelElement = screen.getByText(label);
        expect(checkboxLabelElement).toBeInTheDocument();
    });

    test('calls onChange handler when checkbox is clicked', () => {
        const onChangeMock = jest.fn();
        const { getByLabelText } = render(<Checkbox label="Checkbox Label" checked={false} onChange={onChangeMock} />);
        const checkboxElement = screen.getByLabelText('Checkbox Label');
        fireEvent.click(checkboxElement);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    test('renders checkbox as checked when checked prop is true', () => {
        const { getByRole } = render(<Checkbox label="Checkbox Label" checked={true} onChange={() => {}} />);
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).toBeChecked();
    });
});
