import type { Request, Response, NextFunction } from 'express';
import {Dependencies} from "../../../types/types";
const deleteTransition = (deps: Dependencies) => async (req: Request, res: Response)=> {
    try {
        const { transitionId, fsmId } = req.params;
        if(!transitionId || !fsmId) {
            return res.status(400).send({data: {message:`missing: ${!transitionId ? 'transitionId': ''}${!fsmId ? ',fsmId': ''}`}})
        }
        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if(fsm) {
            fsm.deleteTransition(transitionId);
            return res.send({data: {message:`transition ${transitionId} deleted successfully`, fsm}});
        } else {
            return res.status(404).send({data: {message:`no fsm was found`}})
        }
    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
};

export default deleteTransition;