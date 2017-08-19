import React, { Component } from 'react'

import './App.css';
import Wrapper from './shared/Wrapper'
import Logo from './shared/Logo'
import Login from './shared/Login'
import Loader from './shared/Loader'
import UserActions from './shared/UserActions'

import { fetchData } from '../utils/api';

const LS_KEY = 'blat-jobs__user'

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            users: [],
            needsToLogin: false,
            hasLoginError: false,
            isFetching: true
        }
    }

    componentDidMount () {

        fetchData()
            .then(this.recievedData)
            .catch(this.recievedError)
    }
    
    render () {
        const { users, email } = this.state;

        const user = users.filter(u => u.email === email)[0] || {}
        
        return (
            <div>
                <Wrapper>
                    <UserActions user={ user} />
                    <Logo />

                    { this.renderLogin() }
                </Wrapper>
                { this.renderLoading() }
            </div>
        )
    }

    renderLogin() {
        const { needsToLogin, hasLoginError, isFetching, email } = this.state;

        if(isFetching) return null
        if(!needsToLogin) return null

        return <Login 
            onSubmit={ this.handleLogin }
            hasErrors={ hasLoginError }
            defaultValue={ email }
        />
    }

    renderLoading() {
        const { isFetching } = this.state;

        if(!isFetching) return null;

        return <Loader />
    }

    getUserFromLocalStorage() {
        const email = localStorage.getItem(LS_KEY)

        if(email && this.checkUser(email)) {
            this.setState({
                email
            })
        } else if(email && !this.checkUser(email)) {
            this.setState({
                needsToLogin: true,
                hasLoginError: true,
                email
            })
        } else {
            this.setState({
                needsToLogin: true,
            })
        }

    }

    recievedData = ([
        users
    ]) => {
        this.setState({
            isFetching: false,
            users
        }, () => {
            this.getUserFromLocalStorage()
        })
    }

    recievedError(e) {}

    checkUser(email) {
        const { users } = this.state;
        return users.filter(u => u.email === email).length > 0
    }

    handleLogin = e => {
        const email = e.target.querySelector('[name="email"]').value
        
        e.preventDefault();

        if(this.checkUser(email)) {
            localStorage.setItem(LS_KEY, email)
            this.setState({
                needsToLogin: false,
                email,
                hasLoginError: false
            })
        } else {
            this.setState({
                hasLoginError: true
            })
        }
    }
}

export default App