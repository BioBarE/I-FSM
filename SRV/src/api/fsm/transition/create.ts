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
            return res.status(400).send({data: {message:`missing:${!fsmId ? ',fsmId' : ''}`}})
        }

        if (!transition.source || !transition.target) {
            return res.status(400).send({data: {message:`Please send a valid transition`}})
        }

        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if (fsm) {
            fsm.addTransition(transition, isInitialState);
            return res.send({data: {fsm, message: `transition ${transition.id} was added successfully`}});
        } else {
            return res.status(404).send({data: {message:`no fsm found`}})
        }

    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
}

export default createTransition;
