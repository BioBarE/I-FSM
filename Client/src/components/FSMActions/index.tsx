import React, {ChangeEvent, FC, useState} from 'react';
import {useAddNewTransitionMutation, useCreateNewFSMMutation, useTriggerTransitionMutation} from "../../slices/api/api";
import './FSMActions.css';
import Input from "../Input";
import Button from "../Button";
import {debounce} from "../../utils/debounce";
import useAppSelector from "../../hooks/useAppSelector";
import {selectCurrentFSMId, selectFSMs} from "../../slices/fsm/fsm.selectors";
import {useDispatch} from "../../store";
import {updateCurrentFSM, updateCurrentFSMId} from "../../slices/fsm/fsm";
import {FSM} from "../../types";
import {Autocomplete, TextField} from "@mui/material";

const DEBOUNCE_DELAY = 150;

const FSMActions = () => {
    const dispatch = useDispatch();
    const [createNewFsm] = useCreateNewFSMMutation();
    const [addNewTransition] = useAddNewTransitionMutation();
    const [triggerTransition] = useTriggerTransitionMutation();

    const [transitionSource, setTransitionSource] = useState<string>('');
    const [transitionTarget, setTransitionTarget] = useState<string>('');
    const [fsmLabel, setFsmLabel] = useState<string | null>(null);
    const [isInitialState, setIsInitialState] = useState<boolean>(false);

    const FSMs = useAppSelector(selectFSMs)
    const selectedCurrentFSMId = useAppSelector(selectCurrentFSMId);

    const debouncedSetTransitionSource = debounce((value: string) => {
        setTransitionSource(value)
    }, DEBOUNCE_DELAY);
    const debouncedSetTransitionTarget = debounce((value: string) => {
        setTransitionTarget(value)
    }, DEBOUNCE_DELAY);
    const createNewFSM = async () => {
        const response = await createNewFsm({label: fsmLabel});
        const newFSMId = response as { data?: string };

        if(newFSMId.data) {
            dispatch(updateCurrentFSMId(newFSMId.data));
        }

    }

    const onCreateNewTransitionClicked = async () => {
        if (selectedCurrentFSMId) {
            const response = await addNewTransition({
                fsmId: selectedCurrentFSMId,
                transition: {source: transitionSource, target: transitionTarget},
                isInitialState
            });
            const updatedFSM = response as { data: FSM};
            if (updatedFSM.data) {
                dispatch(updateCurrentFSM(updatedFSM.data))
            }
        }
        setIsInitialState(false);
    }

    const handleTransitionSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSetTransitionSource(value);
    }

    const handleTransitionTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        debouncedSetTransitionTarget(value);
    }

    const handleFSMNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setFsmLabel(value);
    }

    const onTriggerTransitionClicked = async () => {
        if (selectedCurrentFSMId) {
            await triggerTransition({fsmId: selectedCurrentFSMId});
        }
    }

    const handleIsInitialStateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsInitialState(event.target.checked);
    }

    return (
        <div className='fsm-actions-container'>
            <div className='fsm-action-create-new-fsm'>
                <Input placeholder='FSM Name' onChange={handleFSMNameChange}/>
                <Button label='Create new FSM' onClick={createNewFSM} disabled={!fsmLabel}/>
            </div>

            <div className='fsm-action-create-new-transition-container'>
                <div className={'fsm-action-create-new-transition'}>
                    <Input placeholder='Source' onChange={handleTransitionSourceChange}/>
                    <Input placeholder='Target' onChange={handleTransitionTargetChange}/>
                    <Button disabled={!transitionSource || !transitionTarget} label='Create New Transition'
                            onClick={onCreateNewTransitionClicked}/>
                </div>
                <div className={'fsm-action-create-new-transition-init-state'}>
                    <Input checked={isInitialState} onChange={handleIsInitialStateChange} type={'checkbox'}/>
                    <label>Initial State</label>
                </div>
            </div>

            <div className='fsm-action-trigger-next-step'>
                <Button disabled={!selectedCurrentFSMId} label='Trigger a transition'
                        onClick={onTriggerTransitionClicked}/>
            </div>

        </div>
    );
}

export default FSMActions;