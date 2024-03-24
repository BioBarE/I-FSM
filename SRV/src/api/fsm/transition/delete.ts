import type { Request, Response, NextFunction } from 'express';
import {Dependencies} from "../../../types/types";
const deleteTransition = (deps: Dependencies) => async (req: Request, res: Response)=> {
    try {
        const { transitionId, fsmId } = req.params;
        if(!transitionId || !fsmId) {
            return res.send({code: 404, data: {message:`missing: ${!transitionId ? 'transitionId': ''}${!fsmId ? ',fsmId': ''}`}});
        }
        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if(fsm) {
            fsm.deleteTransition(transitionId);
            return res.send({code: 200, data: {message:`transition ${transitionId} deleted successfully`, fsm}});
        } else {
            return res.send({code: 404, data: {message:`no fsm was found`}});
        }


    } catch (e) {
        return res.send(new Error('Internal Error'));
    }
};

export default deleteTransition;