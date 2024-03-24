import {
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import {Response, Transition} from "../../types";

export const rest = createApi({
    reducerPath: 'rest',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001/api/fsm'}),
    tagTypes: ['FSM', 'FSMs'],
    endpoints: (builder) => ({
        getCurrentState: builder.query({query: () => '/state'}),
        getAllFSM: builder.query({query: () => '/', providesTags: ['FSMs']}),
        createNewFSM: builder.mutation({
            query: ({label}: {label?: string | null}) => ({
                url: '/create',
                method: 'POST',
                body: {label}
            }),
            invalidatesTags: ['FSMs'],
            transformResponse: (response: {code: number,data: Response}) => {
                return response.data.fsm.id;
            }
        }),
        addNewTransition: builder.mutation({
            query: ({transition, fsmId, isInitialState}: { transition: Transition, fsmId: string, isInitialState: boolean }) => ({
                url: '/transition/create',
                method: 'POST',
                body: {transition, fsmId, isInitialState}
            }),
            transformResponse: (response: {code: number, data: Response}) => {
                return response.data.fsm;
            }
        }),
        updateTransition: builder.mutation({
            query: ({transition, fsmId}: { transition: Transition, fsmId: string }) => ({
                url: '/transition/update',
                method: 'PUT',
                body: {transition, fsmId}
            })
        }),
        deleteTransition: builder.mutation({
            query: ({transitionId, fsmId}: { transitionId: string, fsmId: string }) => ({
                url: '/transition',
                method: 'DELETE',
                body: {transitionId, fsmId}
            })
        }),
        triggerTransition: builder.mutation({
            query: ({fsmId}: {fsmId: string}) => ({
                url: `/transition/trigger/${fsmId}`,
                method: 'POST'
            })
        })
    })
})

export const {
    useGetCurrentStateQuery,
    useAddNewTransitionMutation,
    useDeleteTransitionMutation,
    useUpdateTransitionMutation,
    useCreateNewFSMMutation,
    useGetAllFSMQuery,
    useTriggerTransitionMutation
} = rest;