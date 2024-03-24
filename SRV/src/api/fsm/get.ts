import {Dependencies} from "../../types/types";
import type { Request, Response, NextFunction } from 'express';

const getAllFSM = (deps: Dependencies) => async (req: Request, res: Response, next: NextFunction)=> {
    try {
        return res.send(deps.fsm);
    } catch (e) {
        return res.status(500).send({data: {message: e.message}})
    }
}

export default getAllFSM;