import {Dependencies} from "../../types/types";
import type { Request, Response, NextFunction } from 'express';

const getFSMState = (deps: Dependencies) => async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { id } = req.params;
        const {fsm} = deps;
        const currFsm = fsm.find((machine)=> machine.getFSMId() === id);

        if(currFsm) {
            return res.send({data: {state: currFsm.getState()}})
        } else {
            return res.status(404).send({data: {message:`Could not find machine with id ${id}`}});
        }
    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
}

export default getFSMState;