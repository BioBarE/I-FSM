import {Dependencies, Transition} from "../../../types/types";
import {Request, Response} from "express";

const updateTransition = (deps: Dependencies) => async (req: Request, res: Response) => {
    try {
        const {transition, fsmId}: { transition: Transition, fsmId: string } = req.body;
        if (!fsmId) {
            return res.send({code: 404, data: {message: `missing:${!fsmId ? ',fsmId' : ''}`}});
        }

        if (!transition.id || !transition.on || !transition.source || !transition.target) {
            return res.send({code: 500, data: {message: `Please send a valid transition`}});
        }

        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if (fsm) {
            fsm.updateTransition(transition);
            return res.send({code: 200, data: {message: `transition ${transition.id} updated successfully`}, fsm});
        } else {
            return res.send({code: 404, data: {message: `no fsm found`}});
        }

    } catch (e) {
        return res.send(new Error('Internal Error'));
    }
}

export default updateTransition;
