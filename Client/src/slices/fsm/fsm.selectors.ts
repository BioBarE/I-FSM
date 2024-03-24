import {RootState} from "../../store";
import {createSelector} from "@reduxjs/toolkit";
import {FSM, Transition} from "../../types";

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

export const selectCurrentStep = createSelector(
    [selectCurrentFSM],
    (fsm: FSM) => {
        return fsm?.currentState;
    }
);

export const selectNodes = createSelector(
    [selectCurrentFSM],
    ((fsm: FSM) => {
        const uniqueNodes = new Set<string>();
        const nodes: any = [];

        if (fsm?.transitions) {
            fsm.transitions.forEach((transition, index) => {
                // Add source node if it's unique
                if (!uniqueNodes.has(transition.source)) {
                    nodes.push({
                        id: transition.source,
                        data: { label: transition.source },
                        position: { x: 0, y: index * 100 },
                    });
                    uniqueNodes.add(transition.source);
                }

                // Add target node if it's unique
                if (!uniqueNodes.has(transition.target)) {
                    nodes.push({
                        id: transition.target,
                        data: { label: transition.target },
                        position: { x: 200, y: index * 100 }, // Adjust position as needed
                    });
                    uniqueNodes.add(transition.target);
                }
            });
        }

        return nodes;
    })
);


export const selectEdges = createSelector(
    [selectCurrentFSM, selectCurrentStep],
    ((fsm: FSM, currentState?: Transition | null) => {
        if (fsm?.transitions) {
            return fsm.transitions.map((transition) => ({
                    id: `${transition.source}-${transition.target}`,
                    source: transition.source,
                    target: transition.target,
                    animated: currentState?.id === transition.id
                })
            )
        }
        return [];
    })
);
