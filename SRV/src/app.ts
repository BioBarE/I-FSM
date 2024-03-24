import {Application} from "express";
import http from "http";
import {Dependencies, Fsm} from "./types/types";
import express from 'express';
import api from "./api";
const cors = require('cors');

export default class App {
    readonly port: number;
    public app: Application;
    private server?: http.Server;
    private readonly fsm: Fsm[];

    constructor({port}) {
        this.port = port;
        this.app = express();
        this.fsm = [];
    }

    async start() {
        try {
            const dependencies: Dependencies = {
                fsm: this.fsm
            }
            this.app.use(cors());
            this.app.use(express.json());
            this.app.use(express.urlencoded({ extended: true }));
            this.app.use('/api', api(dependencies))
            return new Promise<boolean>((resolve,reject) => {
                this.server = this.app.listen(this.port, () => {
                    console.log(`App is running and listing on port ${this.port}`);
                    resolve(true);
                }).on('error', (err) => reject(err));
            })
        } catch (e) {
            return process.exit(1)
        }
    }
};