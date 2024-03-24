import React from 'react';
import { fireEvent, waitFor, screen} from '@testing-library/react';
import Dropdown, {DropDownProps} from "../index";
import {render} from "../../../testUtils/customRenderUtils";

// Mock the createFilterOptions function
jest.mock('@mui/material', () => ({
    ...jest.requireActual('@mui/material'),
    createFilterOptions: jest.fn(() => jest.fn()),
}));

describe('Dropdown component', () => {
    const handleOnChangeMock = jest.fn();
    const options = [
        { id: '1', label: 'Option 1' },
        { id: '2', label: 'Option 2' },
    ];

    const renderComponent = (props: Partial<DropDownProps> = {}) => {
        const defaultProps: DropDownProps = {
            handleOnChange: handleOnChangeMock,
            options,
            value: null,
        };
        return render(<Dropdown {...defaultProps} {...props} />);
    };

    test('renders dropdown with options', async () => {
        renderComponent();
        const inputElement = screen.getByLabelText('FSM Name');

        fireEvent.focus(inputElement);
        await waitFor(() => {
            options.forEach(option => {
                const optionElement = screen.getByText(option.label);
                expect(optionElement).toBeInTheDocument();
            });
        });
    });

    test('calls handleOnChange when option is selected', async () => {
        renderComponent();
        const inputElement = screen.getByLabelText('FSM Name');

        fireEvent.focus(inputElement);
        const optionElement = screen.getByText('Option 1');
        fireEvent.click(optionElement);

        expect(handleOnChangeMock).toHaveBeenCalledTimes(1);
        expect(handleOnChangeMock).toHaveBeenCalledWith(expect.any(Object), options[0]);
    });

    test('renders "Add" option when input value is not present in options', async () => {
        renderComponent();
        const inputElement = screen.getByLabelText('FSM Name');

        fireEvent.change(inputElement, { target: { value: 'New Option' } });
        fireEvent.focus(inputElement);

        await waitFor(() => {
            const addOptionElement = screen.getByText('Add New Option');
            expect(addOptionElement).toBeInTheDocument();
        });
    });
});