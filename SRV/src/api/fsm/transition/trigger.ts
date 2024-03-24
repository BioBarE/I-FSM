import type { Request, Response } from 'express';
import {Dependencies} from "../../../types/types";
const triggerTransition = (deps: Dependencies) => async (req: Request, res: Response)=> {
    try {
        const { fsmId } = req.params;
        if(!fsmId) {
            return res.status(400).send({data: {message: `missing: ${!fsmId ? 'fsmId' : ''}`}})
        }
        const fsm = deps.fsm.find(machine => machine.getFSMId() === fsmId);

        if(fsm) {
            if(!fsm.getState()) {
                return res.status(500).send({data: {message:`Please configure a initial state`}})
            }
            fsm.trigger();
            return res.send({data: {message:`transition was successfully happened`, fsm}});
        } else {
            return res.status(404).send({data: {message:`no fsm was found`}})
        }
    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
};

export default triggerTransition;