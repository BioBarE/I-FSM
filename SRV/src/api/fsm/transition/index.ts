import { Router } from 'express';
import {Dependencies} from "../../../types/types";
import deleteTransition from "./delete";
import updateTransition from "./update";
import createTransition from "./create";
import triggerTransition from "./trigger";


export default (deps: Dependencies): Router => {
    const api = Router();
    api.post('/create', createTransition(deps));
    api.put('/update', updateTransition(deps));
    api.delete('/', deleteTransition(deps));
    api.post('/trigger/:fsmId', triggerTransition(deps))
    return api;
}