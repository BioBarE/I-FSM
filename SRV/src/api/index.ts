import type { Application } from 'express';
import {Dependencies} from "../types/types";
import fsm from './fsm';

const express = require('express');


export default function api(deps: Dependencies): Application {
    const router = express();
    router.use('/fsm', fsm(deps));
    return router;
}
