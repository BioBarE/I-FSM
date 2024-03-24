import {Dependencies, Transition} from "../../../types/types";
import {Request, Response} from "express";

const updateTransition = (deps: Dependencies) => async (req: Request, res: Response) => {
    try {
        const {transition, fsmId}: { transition: Transition, fsmId: string } = req.body;
        if (!fsmId) {
            return res.status(400).send({data: {message:`missing:${!fsmId ? ',fsmId' : ''}`}})
        }

        if (!transition.id || !transition.on || !transition.source || !transition.target) {
            return res.status(400).send({data: {message: `Please send a valid transition`}})
        }

        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if (fsm) {
            fsm.updateTransition(transition);
            return res.send({data: {message: `transition ${transition.id} updated successfully`}, fsm});
        } else {
            return res.status(404).send({data: {message:`no fsm was found`}})
        }

    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
}

export default updateTransition;
