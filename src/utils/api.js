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