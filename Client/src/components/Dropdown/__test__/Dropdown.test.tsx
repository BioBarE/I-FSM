import React from 'react';
import {fireEvent, screen} from '@testing-library/react';
import {renderWithProviders} from "../../../testUtils/customRenderUtils";
import Dropdown from "../index";

const options = [
    { id: 'option1', label: 'Option 1' },
    { id: 'option2', label: 'Option 2' },
    { id: 'option3', label: 'Option 3' },
];

describe('Dropdown Component', () => {
    it('should render the label and input field', () => {
        renderWithProviders(
            <Dropdown label="Test Label" options={options} value={null} handleOnChange={() => {}} />
        );

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByTestId('text-field-Test Label')).toBeInTheDocument();
    });

    it('should display the options when input field is focused', () => {
        renderWithProviders(
            <Dropdown label="Test Label" options={options} value={null} handleOnChange={() => {}} />
        );

        const input = screen.getByRole('combobox');
        fireEvent.mouseDown(input);

        expect(input).toHaveAttribute('aria-expanded', 'true');
    });

    it('should filter options based on user input', () => {
        renderWithProviders(
            <Dropdown label="Test Label" options={options} value={null} handleOnChange={() => {}} />
        );

        const input = screen.getByRole('combobox');
        fireEvent.mouseDown(input);


        fireEvent.change(input, { target: { value: 'Option' } });

        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
        expect(screen.getByText('Option 3')).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Opt3' } });

        expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
        expect(screen.queryByText('Option 2')).not.toBeInTheDocument();
    });

    it('should allow entering a new option (freeSolo)', () => {
        const mockHandleChange = jest.fn();
        renderWithProviders(
            <Dropdown label="Test Label" options={options} value={null} handleOnChange={mockHandleChange} />
        );

        const input = screen.getByRole('combobox');
        fireEvent.change(input, { target: { value: 'New Option' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(mockHandleChange).toHaveBeenCalled();
        expect(screen.queryByText('Add New Option')).not.toBeInTheDocument(); // Option shouldn't be displayed in list
    });

    it('should call handleOnChange when an option is selected', () => {
        const mockHandleChange = jest.fn();
        renderWithProviders(
            <Dropdown label="Test Label" options={options} value={null} handleOnChange={mockHandleChange} />
        );

        const input = screen.getByRole('combobox');
        fireEvent.change(input, { target: { value: 'Option 1' } });
        fireEvent.keyDown(input, { key: 'Enter' });

        expect(mockHandleChange).toHaveBeenCalled();
    });
});
