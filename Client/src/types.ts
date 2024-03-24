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
export type FSM = {
    id: string,
    label: string,
    transitions: Transition[]
}
export type Response = {
    fsm: FSM
}