import {Dependencies, Transition} from "../../../types/types";
import {Request, Response} from "express";

const createTransition = (deps: Dependencies) => async (req: Request, res: Response) => {
    try {
        const {transition, fsmId, isInitialState}: {
            transition: Transition,
            fsmId: string,
            isInitialState: boolean
        } = req.body;
        if (!fsmId) {
            return res.send({code: 404, data: {message: `missing:${!fsmId ? ',fsmId' : ''}`}});
        }

        if (!transition.source || !transition.target) {
            return res.send({code: 404, data: {message: `Please send a valid transition`}});
        }

        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if (fsm) {
            fsm.addTransition(transition, isInitialState);
            return res.send({code: 200, data: {fsm, message: `transition ${transition.id} was added successfully`}});
        } else {
            return res.send({code: 404, data: {message: `no fsm found`}});
        }

    } catch (e) {
        return res.send(new Error('Internal Error'));
    }
}

export default createTransition;
