import React from 'react';
import {fireEvent, waitFor, screen} from '@testing-library/react';
import FSMActions from "../index";

import {renderWithProviders} from "../../../testUtils/customRenderUtils";
import {useCreateNewFSMMutation} from "../../../slices/api/api";

describe('FSMActions Component', () => {

    test('renders without errors', () => {
        renderWithProviders(
            <FSMActions />
        );
        expect(screen.getByText('Name Your Machine')).toBeInTheDocument();
        expect(screen.getByText('Lets create a new transition to this machine')).toBeInTheDocument();
        expect(screen.getByText('Lets try the machine')).toBeInTheDocument();
    });

    test('creates a new FSM when name is selected', async () => {
        const mockCreateNewFSMMutation = jest.fn();
        (useCreateNewFSMMutation as jest.Mock).mockReturnValue([mockCreateNewFSMMutation]);

        renderWithProviders(
            <FSMActions />
        );

        const input = screen.getByRole('combobox');

        fireEvent.change(input, { target: { value: 'Test FSM' } });
        fireEvent.keyDown(input, { key: 'arrowdown' });
        fireEvent.keyDown(input, { key: 'Enter' });

        // const newOption = screen.getByText('Add Test FSM');
        // fireEvent.mouseDown(newOption);

        expect(mockCreateNewFSMMutation).toHaveBeenCalled();

        expect(screen.getByText('Test FSM')).toBeInTheDocument();
    });

    test('handles transition creation', async () => {
        const mockAddNewTransition = jest.fn().mockResolvedValue({ id: 'transitionId' });
        jest.mock('../../slices/api/api', () => ({
            useCreateNewFSMMutation: () => [jest.fn()],
            useAddNewTransitionMutation: () => [mockAddNewTransition],
            useTriggerTransitionMutation: () => [jest.fn()],
        }));

        renderWithProviders(
            <FSMActions />
        );

        const sourceInput = screen.getByLabelText('Source');
        const targetInput = screen.getByLabelText('Target');
        const initialStateCheckbox = screen.getByLabelText('Initial State');
        const createButton = screen.getByText('Create A New Transition');

        fireEvent.change(sourceInput, { target: { value: 'Source State' } });
        fireEvent.change(targetInput, { target: { value: 'Target State' } });
        fireEvent.click(initialStateCheckbox);
        fireEvent.click(createButton);

        await waitFor(() => {
            expect(mockAddNewTransition).toHaveBeenCalled();
        });

        expect(mockAddNewTransition).toHaveBeenCalledWith({
            fsmId: expect.any(String),
            transition: { source: 'Source State', target: 'Target State' },
            isInitialState: true,
        });
    });

    test('handles trigger transition', async () => {
        const mockTriggerTransition = jest.fn().mockResolvedValue({ id: 'transitionId' });
        jest.mock('../../slices/api/api', () => ({
            useCreateNewFSMMutation: () => [jest.fn()],
            useAddNewTransitionMutation: () => [jest.fn()],
            useTriggerTransitionMutation: () => [mockTriggerTransition],
        }));

        renderWithProviders(
            <FSMActions />
        );

        const triggerButton = screen.getByText('Trigger next step');
        fireEvent.click(triggerButton);

        await waitFor(() => {
            expect(mockTriggerTransition).toHaveBeenCalled();
        });
    });
});
