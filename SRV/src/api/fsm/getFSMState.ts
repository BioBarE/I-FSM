import {Dependencies} from "../../types/types";
import type { Request, Response, NextFunction } from 'express';

const getFSMState = (deps: Dependencies) => async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { id } = req.params;
        const {fsm} = deps;
        const currFsm = fsm.find((machine)=> machine.getFSMId() === id);

        if(currFsm) {
            return res.send({code: 200, data: {state: currFsm.getState()}})
        } else {
            return res.send(new Error(`Could not find machine with id ${id}`));
        }
    } catch (e) {
        return res.send(new Error(`Internal error`));
    }
}

export default getFSMState;