import React, {ChangeEvent, useState} from 'react';
import {useAddNewTransitionMutation, useCreateNewFSMMutation, useTriggerTransitionMutation} from "../../slices/api/api";
import Input from "../Input";
import Button from "../Button";
import useAppSelector from "../../hooks/useAppSelector";
import {selectCurrentFSM, selectCurrentFSMId, selectFSMs} from "../../slices/fsm/fsm.selectors";
import {useDispatch} from "../../store";
import {updateCurrentFSM, updateCurrentFSMId} from "../../slices/fsm/fsm";
import {FSM} from "../../types";
import {Box, Grid} from "@mui/material";
import Dropdown from "../Dropdown";
import Checkbox from "../Checkbox";
import Label from "../Label";


const FSMActions = () => {
    const dispatch = useDispatch();
    const [createNewFsm] = useCreateNewFSMMutation();
    const [addNewTransition] = useAddNewTransitionMutation();
    const [triggerTransition] = useTriggerTransitionMutation();

    const [transitionSource, setTransitionSource] = useState<string>('');
    const [transitionTarget, setTransitionTarget] = useState<string>('');
    const [fsmLabel, setFsmLabel] = useState<string | null>(null);
    const [isInitialState, setIsInitialState] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const FSMs = useAppSelector(selectFSMs)
    const selectedCurrentFSMId = useAppSelector(selectCurrentFSMId);
    const selectedCurrentFSM = useAppSelector(selectCurrentFSM);
    const createNewFSM = async (fsmLabel: string) => {
        createNewFsm({label: fsmLabel})
            .unwrap()
            .then((newFSMId:string) => {
                if (newFSMId) {
                    dispatch(updateCurrentFSMId(newFSMId));
                }
            }).catch((error) => {
            setErrorMessage(error.data.data.message || 'Internal Error')
        });
    }

    const onCreateNewTransitionClicked = async () => {
        if (selectedCurrentFSMId) {
            addNewTransition({
                fsmId: selectedCurrentFSMId,
                transition: {source: transitionSource, target: transitionTarget},
                isInitialState
            })
                .unwrap()
                .then((updatedFSM: FSM) => {
                    if (updatedFSM.id) {
                        dispatch(updateCurrentFSM(updatedFSM))
                    }
                }).catch((error) => {
                    setErrorMessage(error.data.data.message || 'Internal Error')
                });
        }
        setIsInitialState(false);
    }

    const handleTransitionSourceChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTransitionSource(value);
    }

    const handleTransitionTargetChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setTransitionTarget(value)
    }

    const handleFSMNameChange = (_: any, newValue: FSM | string | null) => {
        if (typeof newValue === 'object' && newValue) {
            let newFSMLabel = newValue.label;
            if (newValue?.label) {

                if (newValue?.label?.startsWith("Add")) {
                    newFSMLabel = newValue.label.substring(4).trim();
                }

                setFsmLabel(newValue.label);
            }
            // selected already created fsm
            if (newValue?.id) {
                dispatch(updateCurrentFSMId(newValue.id))
            } else {
                createNewFSM(newFSMLabel);
            }
        }
    }

    const onTriggerTransitionClicked = async () => {
        if (selectedCurrentFSMId) {
            triggerTransition({fsmId: selectedCurrentFSMId})
                .unwrap()
                .then((updatedFSM) => {
                    if (updatedFSM.id) {
                        dispatch(updateCurrentFSM(updatedFSM));
                    }
                })
                .catch((error) => {
                    setErrorMessage(error.data.data.message || 'Internal Error')
                });
        }
    }

    const handleIsInitialStateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setIsInitialState(event.target.checked);
    }

    return (
        <Grid ml={2} container display={'flex'} flexDirection={'column'} alignItems={'flex-start'} gap={2}>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start'}}>
                <Label text={'Name Your Machine'}/>
                <Dropdown label={'FSM Name'} handleOnChange={handleFSMNameChange} options={FSMs} value={selectedCurrentFSM}/>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start'}}>
                <Label text={'Lets create a new transition to this machine'}/>
                <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                    <Input label={'Source'} value={transitionSource} onChange={handleTransitionSourceChange}/>
                    <Input label={'Target'} value={transitionTarget} onChange={handleTransitionTargetChange}/>
                    <Checkbox label={'Initial State'} checked={isInitialState} onChange={handleIsInitialStateChange}/>
                    <Button label={'Create A New Transition'} disabled={!transitionSource || !transitionTarget}
                            onClick={onCreateNewTransitionClicked}/>
                </Box>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start'}}>
                <Label text={'Lets try the machine'}/>
                <Button label={'Trigger next step'} disabled={!selectedCurrentFSMId}
                        onClick={onTriggerTransitionClicked}/>
            </Box>

            <Box>
                <Label isError={true} text={errorMessage}/>
            </Box>
        </Grid>
    );
}

export default FSMActions;