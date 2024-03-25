/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import './App.css';
import {useGetAllFSMQuery,} from "./slices/api/api";
import FSMState from "./components/FSMState";
import {useDispatch} from "./store";
import {updateFSMs} from "./slices/fsm/fsm";
import FSMActions from "./components/FSMActions";
import {Box, Typography} from "@mui/material";

function App() {
    const {data: FSMs} = useGetAllFSMQuery({});
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateFSMs(FSMs));
    }, [FSMs])

    return (
        <div className="App">
            <Box sx={{width: '50vw', height: '100vh', display:'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Typography color={'#bdbdbd'} variant={'h2'}>Welcome to the Incredible Finite State Machine</Typography>
                <FSMActions/>
            </Box>
            <Box sx={{width: '50vw', height: '100vh'}}>
                <FSMState/>
            </Box>
        </div>
    );
}

export default App;
