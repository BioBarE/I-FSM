import { Router } from 'express';
import {Dependencies} from "../../types/types";
import getFSMState from "./getFSMState";
import createFSM from "./create";
import transition from "./transition";
import getAllFSM from "./get";

export default (deps: Dependencies): Router => {
    const api = Router();
    api.get('/', getAllFSM(deps));
    api.get('/state/:id', getFSMState(deps));
    api.post('/create', createFSM(deps));
    api.use('/transition', transition(deps))
    return api;
}