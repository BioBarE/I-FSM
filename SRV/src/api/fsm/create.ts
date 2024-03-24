import {Dependencies} from "../../types/types";
import type { Request, Response } from 'express';
import FSM from "../../services/FSM";


const createFSM = (deps: Dependencies) => async (req: Request, res: Response)=> {
    try {
        const {fsm} = deps;
        const { label } = req.body;
        const newFsm = new FSM({label});
        if(newFsm) {
            fsm.push(newFsm);
            return res.send({code: 200, data: {message: 'created fsm successfully', fsm: newFsm}});
        } else {
            return res.send({code: 500, data: {message: 'Could not create a new FSM'}});
        }
    } catch (e) {
        return res.send(new Error(`Internal error`));
    }
}

export default createFSM;