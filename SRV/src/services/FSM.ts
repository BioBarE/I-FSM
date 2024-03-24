import {State, Transition, Event, Fsm} from "../types/types";
import { v4 as uuidv4 } from 'uuid';
import transition from "../api/fsm/transition";

export default class FSM implements Fsm {
    private currentState: Transition;
    private transitions: Transition[] = [];
    private readonly id: string;
    label: string;

    constructor({label}: {label: string}) {
        this.id = uuidv4();
        this.label = label;
    }

    // public setCurrentState = (state: State) => {
    //     if(state) {
    //         this.currentState = state;
    //     }
    // }

    public addTransition = (transition: Transition, isInitialState: boolean) => {
        if(transition) {
            transition.id = uuidv4();
            this.transitions.push(transition);
        }

        if(isInitialState) {
            this.currentState = transition;
        }
    }

    public addTransitions = (transitions: Transition[]) => {
        if(transitions.length) {
            for(let transition of transitions) {
                transition.id = uuidv4();
                this.transitions.push((transition));
            }
        }
    }

    public triggerByEvent = (event: Event, context?: any) => {
        const isMatchingTransition = this.transitions.find((transition: Transition) => transition.source === this.currentState.source && transition.on === event);

        if(isMatchingTransition) {
            this.currentState = isMatchingTransition;
            isMatchingTransition.cb?.(context);
        } else {
            console.log(`no ${event}`);
        }
    }

    public trigger = () => {
        const nextTransition = this.transitions.find((transition) => transition.source === this.currentState.target)
        if(nextTransition) {
            this.currentState = nextTransition;
        } else {
            throw new Error('No Transition was found');
        }
    }

    public getState = () => {
        return this.currentState;
    }

    public getFSMId = () => {
        return this.id;
    }

    public deleteTransition = (transitionId: string) => {
        this.transitions = this.transitions.filter(transition => transition.id !== transitionId);
    }

    public updateTransition = (updatedTransition: Transition) => {
        let transition = this.transitions.find(transition => transition.id !== updatedTransition.id);
        if(transition) {
            transition = updatedTransition;
        }
    }

}