import {Dependencies} from "../../types/types";
import type { Request, Response } from 'express';
import FSM from "../../services/FSM";


const createFSM = (deps: Dependencies) => async (req: Request, res: Response)=> {
    try {
        const {fsm} = deps;
        const { label } = req.body;
        const isAlreadyNameExists = fsm.find(machine => machine.getFSMLabel() === label);
        if(isAlreadyNameExists) {
            return res.status(500).send({data: {message: 'This name is already taken'}})
        }
        const newFsm = new FSM({label});
        if(newFsm) {
            fsm.push(newFsm);
            return res.send({data: {message:'created fsm successfully', fsm: newFsm}});
        } else {
            return res.status(400).send({data: {message: 'Could not create a new FSM'}})
        }
    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
}

export default createFSM;