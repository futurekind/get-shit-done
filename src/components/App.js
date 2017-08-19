import React, { Component } from 'react'

import './App.css';
import Wrapper from './shared/Wrapper'
import Logo from './shared/Logo'
import Login from './shared/Login'
import Loader from './shared/Loader'

import { fetchData } from '../utils/api';

const LS_KEY = 'blat-jobs__user'

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            users: [],
            needsToLogin: false,
            hasLoginError: false,
            isFetching: true
        }
    }

    componentDidMount () {
        this.getUserFromLocalStorage()

        fetchData()
            .then(this.recievedData)
            .catch(this.recievedError)
    }
    
    render () {
        return (
            <Wrapper>
                <Logo />

                { this.renderLoading() }
                { this.renderLogin() }
            </Wrapper>
        )
    }

    renderLogin() {
        const { needsToLogin, hasLoginError, isFetching } = this.state;

        if(isFetching) return null
        if(!needsToLogin) return null

        return <Login 
            onSubmit={ this.handleLogin }
            hasErrors={ hasLoginError }
        />
    }

    renderLoading() {
        const { isFetching } = this.state;

        if(!isFetching) return null;

        return <Loader />
    }

    getUserFromLocalStorage() {
        

        const user = localStorage.getItem(LS_KEY)

        if(user) {
            this.setState({
                user
            })
        } else {
            this.setState({
                needsToLogin: true
            })
        }
    }

    recievedData = ([
        users
    ]) => {
        this.setState({
            isFetching: false,
            users
        })
    }

    recievedError(e) {}

    handleLogin = e => {
        const email = e.target.querySelector('[name="email"]').value
        
        e.preventDefault();

        if(true) {
            localStorage.setItem(LS_KEY, email)
            this.setState({
                needsToLogin: false,
                user: email
            })
        }
    }
}

export default App