import type { Request, Response } from 'express';
import {Dependencies} from "../../../types/types";
const triggerTransition = (deps: Dependencies) => async (req: Request, res: Response)=> {
    try {
        const { fsmId } = req.params;
        if(!fsmId) {
            return res.send({code: 404, data: {message:`missing: ${!fsmId ? 'fsmId': ''}`}});
        }
        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if(fsm) {
            fsm.trigger();
            return res.send({code: 200, data: {message:`transition was successfully happened`, fsm}});
        } else {
            return res.send({code: 404, data: {message:`no fsm was found`}});
        }


    } catch (e) {
        return res.send(new Error('Internal Error'));
    }
};

export default triggerTransition;