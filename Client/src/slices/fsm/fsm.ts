import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {FSM, Transition} from "../../types";

export interface fsmState {
    FSMs: any;
    currentFSMId?: string | null;
}

const initialState: fsmState = {
    FSMs: [],
    currentFSMId: null,
}

const fsm = createSlice({
    name: 'fsm',
    initialState,
    reducers: {
        updateFSMs(state: fsmState, action: PayloadAction<FSM[]>): void {
            if(action?.payload?.length) {
                if(!state.FSMs?.length) {
                    state.currentFSMId = action.payload?.[0].id;
                }
                state.FSMs = action.payload;
            }

        },
        updateCurrentFSMId(state: fsmState, action: PayloadAction<string>): void {
            state.currentFSMId = action.payload
        },
        updateCurrentFSM(state: fsmState, action: PayloadAction<FSM>): void {
            const updatedFSM = action.payload;
            state.FSMs = state.FSMs.map((fsm:FSM) => {
                if (fsm.id === updatedFSM.id) {
                    return updatedFSM;
                }
                return fsm;
            });
        }
    }
})

export const { updateFSMs,updateCurrentFSMId, updateCurrentFSM} = fsm.actions;

export {fsm}