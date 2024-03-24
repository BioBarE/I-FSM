/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect} from 'react';
import useAppSelector from "../../hooks/useAppSelector";
import {selectEdges, selectNodes} from "../../slices/fsm/fsm.selectors";
import 'reactflow/dist/style.css';
import ReactFlow, {
    useNodesState,
    useEdgesState,
    Background,
    Controls,
    applyNodeChanges,
    applyEdgeChanges
} from 'reactflow';

const FSMState = () => {
    const selectedEdges = useAppSelector(selectEdges);
    const selectedNodes = useAppSelector(selectNodes);

    const [nodes, setNodes] = useNodesState(selectedNodes);
    const [edges, setEdges] = useEdgesState(selectedEdges);

    const onNodesChange = useCallback(
        (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );

    useEffect(() => {
        setNodes(selectedNodes)
    }, [selectedNodes]);

    useEffect(() => {
        setEdges(selectedEdges)
    }, [selectedEdges])

    return (
        <>
            {
                nodes && edges ?
                    <ReactFlow nodes={nodes}
                               edges={edges}
                               onNodesChange={onNodesChange}
                               onEdgesChange={onEdgesChange}
                               fitView>
                        <Background/>
                        <Controls/>
                    </ReactFlow> : null
            }
        </>
    );
};

export default FSMState;
