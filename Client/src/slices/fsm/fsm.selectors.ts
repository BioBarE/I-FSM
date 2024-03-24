import {RootState} from "../../store";
import {createSelector} from "@reduxjs/toolkit";
import {FSM} from "../../types";

export const selectFSMs = (state: RootState) => state.fsm.FSMs;
export const selectCurrentFSMId = (state: RootState) => state.fsm.currentFSMId;

export const selectCurrentFSM = createSelector(
    [selectFSMs, selectCurrentFSMId],
    (FSMs, currentFSMId) => {
        if (FSMs.length) {
            return FSMs.find((fsm: any) => fsm.id === currentFSMId);
        }
    }
);

export const selectNodes = createSelector(
    [selectCurrentFSM],
    ((fsm: FSM) => {
        if (fsm?.transitions) {
            return fsm.transitions.map((transition, index) => ({
                id: transition.source,
                data: {label: transition.source},
                position: {x: 0, y: index * 100}
            }))
        }
        return [];
    })
);

export const selectEdges = createSelector(
    [selectCurrentFSM],
    ((fsm: FSM) => {
        if (fsm?.transitions) {
            return fsm.transitions.map((transition) => ({
                    id: `${transition.source}-${transition.target}`,
                    source: transition.source,
                    target: transition.target,
                })
            )
        }
        return [];
    })
);