import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';

import './App.css';
import Wrapper from './shared/Wrapper'
import Logo from './shared/Logo'
import Login from './shared/Login'
import Loader from './shared/Loader'
import UserActions from './shared/UserActions'
import Filter from './shared/Filter'

import { fetchData } from '../utils/api';

const LS_KEY = 'blat-jobs__user'

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            users: [],
            jobs: [],
            needsToLogin: false,
            hasLoginError: false,
            isFetching: true,
            filter: {
                status: 'ALL',
                span: 'WEEK'
            }
        }
    }

    componentDidMount () {

        fetchData()
            .then(this.recievedData)
            .catch(this.recievedError)
    }
    
    render () {
        const { users, email } = this.state;

        const user = users.filter(u => u.email === email && !u.isArchived)[0] || {}
        
        return (
            <div>
                <Wrapper>
                    <UserActions user={ user} />
                    <Logo />
                    { this.renderMain() }
                    { this.renderLogin() }
                </Wrapper>
                { this.renderLoading() }
            </div>
        )
    }

    renderMain() {
        const {
            filter,
            isFetching,
            needsToLogin
        } = this.state

        if(isFetching || needsToLogin) return null;

        const appear = keyframes`
            from { opacity: 0 }
            to { opacity: 100 }
        `
        const StyledFilter = styled(Filter)`
            animation: ${appear} 0.5s 0.1s ease-out both
        `

        return (
            <div>
                <StyledFilter 
                    status={ filter.status }
                    span={ filter.span }
                    onChange={ this.handleChangeFilter }
                />
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
        users, jobs
    ]) => {
        this.setState({
            isFetching: false,
            users, jobs
        }, () => {
            this.getUserFromLocalStorage()
        })
    }

    recievedError(e) {}

    checkUser(email) {
        const { users } = this.state;
        return users.filter(u => u.email === email && !u.isArchived).length > 0
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

    handleChangeFilter = (type, value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [type]: value
            }
        })
    }
}

export default App