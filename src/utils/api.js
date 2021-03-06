import { createUserId, getUserId } from './user';

createUserId()
const userId = getUserId() || '';

const API = 'https://tools.e-contents.de';

const dealWithResponse = resp => {
    if(resp.ok)  return resp.json()
    throw new Error()
}

const fetchUsers = () => 
    fetch(`${API}/users`)
        .then(dealWithResponse)

const fetchJobs = () => 
    fetch(`${API}/jobs`)
        .then(dealWithResponse)

const fetchPhases = () =>
    fetch(`${API}/phases`)
        .then(dealWithResponse)

const fetchProjects = () =>
    fetch(`${API}/projects`)
        .then(dealWithResponse)

export const fetchData = () => Promise.all([
    fetchUsers(),
    fetchJobs(),
    fetchPhases(),
    fetchProjects(),
])

export const updateJob = (id, payload) => {
    return fetch(`${API}/jobs/${id}?clientUserId=${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ [payload.name]: payload.value })
    })
}