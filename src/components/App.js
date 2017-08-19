import React, { Component } from 'react'

import './App.css';
import Wrapper from './shared/Wrapper'
import Logo from './shared/Logo'
import Login from './shared/Login'

const LS_KEY = 'blat-jobs__user'

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            user: null,
            needsToLogin: false
        }
    }

    componentDidMount () {
        this.getUserFromLocalStorage()
    }
    
    render () {
        return (
            <Wrapper>
                <Logo />

                { this.renderLogin() }
            </Wrapper>
        )
    }

    renderLogin() {
        const { needsToLogin } = this.state;

        if(!needsToLogin) return null

        return <Login 
            onSubmit={ this.handleLogin }
            hasErrors={ false }
        />
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