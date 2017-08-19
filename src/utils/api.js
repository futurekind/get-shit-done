const API = 'https://tools.e-contents.de';

const fetchUsers = () => 
    fetch(`${API}/users`)
        .then(resp => {
            if(resp.ok)  return resp.json()
            throw new Error()
        })

export const fetchData = () => new Promise(res => {
    setTimeout(() => {
        res(Promise.all([
            fetchUsers()
        ]))
    }, 0)
})