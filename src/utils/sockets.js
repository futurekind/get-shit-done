import io from 'socket.io-client';
import { getUserId } from './user'
import { getIndex } from './data'

// const handleProjectData = data => {
//     switch (data.method) {
//         case 'update':
//             if (data.item.isArchived) {
//                 store.dispatch({
//                     type: 'ARCHIVE_PROJECT_SOCKET',
//                     payload: data.item
//                 })
//                 break;
//             } else {
//                 store.dispatch({
//                     type: 'UPDATE_PROJECT_SOCKET',
//                     payload: data.item
//                 })
//                 break;
//             }

//         case 'create':
//             store.dispatch({
//                 type: 'ADD_PROJECT_SOCKET',
//                 payload: data.item
//             })
//             break;

//         default: break;
//     }
// }

// const handlePhaseData = data => {
//     switch (data.method) {
//         case 'update':
//             if (data.item.isArchived) {
//                 store.dispatch({
//                     type: 'ARCHIVE_PHASE_SOCKET',
//                     payload: data.item
//                 })
//                 break;
//             } else {
//                 store.dispatch({
//                     type: 'UPDATE_PHASE_SOCKET',
//                     payload: data.item
//                 })
//                 break;
//             }

//         case 'create':
//             store.dispatch({
//                 type: 'ADD_PHASE_SOCKET',
//                 payload: data.item
//             })
//             break;

//         default: break;
//     }
// }

// const handleJobData = data => {
//     switch (data.method) {
//         case 'update':
//             if (data.item.isArchived) {
//                 store.dispatch({
//                     type: 'ARCHIVE_JOB_SOCKET',
//                     payload: data.item
//                 })
//                 break;
//             } else {
//                 store.dispatch({
//                     type: 'UPDATE_JOB_SOCKET',
//                     payload: data.item
//                 })
//                 break;
//             }

//         case 'create':
//             store.dispatch({
//                 type: 'ADD_JOB_SOCKET',
//                 payload: data.item
//             })
//             break;

//         default: break;
//     }
// }

const update = (state, field, data) => {
    const index = getIndex(state, field, data.item.id)
    
    return {
        ...state,
        [field]: [
            ...state[field].slice(0, index),
            data.item,
            ...state[field].slice(index + 1),
        ]
    }
}

const create = (state, field, data) => {
    return {
        ...state,
        [field]: [
            ...state[field],
            data.item
        ]
    }
}

export const getState = (state, data) => {
    let field
    
    switch(data.kind) {
        case 'liner#job': field = 'jobs'; break;
        case 'liner#phase': field = 'phases'; break;
        case 'liner#project': field = 'projects'; break;
        default: return state;
    }

    switch(data.method) {
        case 'update': 
            return update(state, field, data)

        case 'create':
            return create(state, field, data)

        default:
            return state
    }
}

export default (cb) => {
    const socket = io('https://tools.e-contents.de')
    const userId = getUserId()

    if (!userId) return;

    socket.on('onData', data => {
        if (data.clientUserId !== userId) {
            cb(data)
        }
    })
}