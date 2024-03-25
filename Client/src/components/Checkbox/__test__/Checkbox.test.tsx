import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import Checkbox from "../index";
import {renderWithProviders} from "../../../testUtils/customRenderUtils";

describe('Checkbox', () => {
    test('renders checkbox with label', () => {
        const label = 'Checkbox Label';
        renderWithProviders(<Checkbox label={label} checked={false} onChange={() => {}} />);
        const checkboxLabelElement = screen.getByText(label);
        expect(checkboxLabelElement).toBeInTheDocument();
    });

    test('calls onChange handler when checkbox is clicked', () => {
        const onChangeMock = jest.fn();
        renderWithProviders(<Checkbox label="Checkbox Label" checked={false} onChange={onChangeMock} />);
        const checkboxElement = screen.getByLabelText('Checkbox Label');
        fireEvent.click(checkboxElement);
        expect(onChangeMock).toHaveBeenCalledTimes(1);
    });

    test('renders checkbox as checked when checked prop is true', () => {
        renderWithProviders(<Checkbox label="Checkbox Label" checked={true} onChange={() => {}} />);
        const checkboxElement = screen.getByRole('checkbox');
        expect(checkboxElement).toBeChecked();
    });
});
