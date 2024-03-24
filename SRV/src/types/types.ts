export type State = string;
export type Event = string;
export type Context = any;

export type Transition = {
    source: State;
    target: State;
    on?: Event;
    cb?: (context: Context) => void;
    id?: string,
    name?: string,
};

export interface Fsm {
    getState: () => Transition;
    getFSMId: () => string;
    triggerByEvent: (event: Event, context?: Context) => void;
    trigger: () => void;
    // setCurrentState: (state: State) => void;
    addTransition: (transition: Transition, isInitialState: boolean) => void;
    addTransitions: (transitions: Transition[]) => void;
    deleteTransition: (transitionId: string) => void;
    updateTransition: (transition: Transition) => void;
}

export interface Dependencies {
    fsm: Fsm[]
}