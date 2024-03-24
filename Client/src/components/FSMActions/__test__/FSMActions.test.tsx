import React from 'react';
import { fireEvent, waitFor, screen } from '@testing-library/react';

import {render} from "../../../testUtils/customRenderUtils";
import FSMActions from "../index";
describe('FSMActions Component', () => {
    test('renders without errors', () => {
        render(
            <FSMActions />
        );
        expect(screen.getByText('Name Your Machine')).toBeInTheDocument();
        expect(screen.getByText('Lets create a new transition to this machine')).toBeInTheDocument();
        expect(screen.getByText('Lets try the machine')).toBeInTheDocument();
    });

    test('creates a new FSM when name is selected', async () => {
        const mockCreateNewFsm = jest.fn().mockResolvedValue('newFSMId');
        jest.mock('../../../slices/api/api', () => ({
            useCreateNewFSMMutation: () => [mockCreateNewFsm],
            useAddNewTransitionMutation: () => [jest.fn()],
            useTriggerTransitionMutation: () => [jest.fn()],
        }));

        render(
            <FSMActions />
        );

        const input = screen.getByText('Name Your Machine');
        fireEvent.change(input, { target: { value: 'Test FSM' } });
        fireEvent.blur(input);

        // Wait for the async function to complete
        await waitFor(() => {
            expect(mockCreateNewFsm).toHaveBeenCalled();
        });

        expect(screen.getByText('Test FSM')).toBeInTheDocument();
    });

    test('handles transition creation', async () => {
        const mockAddNewTransition = jest.fn().mockResolvedValue({ id: 'transitionId' });
        jest.mock('../../slices/api/api', () => ({
            useCreateNewFSMMutation: () => [jest.fn()],
            useAddNewTransitionMutation: () => [mockAddNewTransition],
            useTriggerTransitionMutation: () => [jest.fn()],
        }));

        render(
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

        render(
            <FSMActions />
        );

        const triggerButton = screen.getByText('Trigger next step');
        fireEvent.click(triggerButton);

        await waitFor(() => {
            expect(mockTriggerTransition).toHaveBeenCalled();
        });
    });
});
