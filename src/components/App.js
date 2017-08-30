import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components';
import format from 'date-fns/format'

import './App.css';
import Wrapper from './shared/Wrapper'
import Logo from './shared/Logo'
import Login from './shared/Login'
import Loader from './shared/Loader'
import UserActions from './shared/UserActions'
import Filter from './shared/Filter'
import Title from './shared/Title'
import Job from './shared/Job'

import { fetchData, updateJob } from '../utils/api';
import { getJobs, getIndex, getEffortStats } from '../utils/data'
import createSockets, { getState } from '../utils/sockets'

const LS_KEY = 'blat-jobs__user'

class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: null,
            users: [],
            jobs: [],
            phases: [],
            projects: [],
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

        createSockets(this.handleSocketsData)
    }
    
    render () {
        const { users, email } = this.state;

        const user = users.filter(u => u.email === email && !u.isArchived)[0] || {}
        
        return (
            <div>
                <Wrapper>
                    <UserActions user={ user} onClick={ this.handleLogout } />
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

        const list = getJobs(this.state);
        
        return (
            <div>
                <StyledFilter 
                    status={ filter.status }
                    span={ filter.span }
                    onChange={ this.handleChangeFilter }
                />

                { filter.span === 'WEEK' && 
                    this.renderListForWeek(list)
                }

                { filter.span === 'LAST_WEEK' && 
                    this.renderList(list, 'older')
                }

                { filter.span === 'NEXT_WEEK' && 
                    this.renderList(list, 'current')
                }

            </div>
        )
    }

    renderListForWeek(list) {
        const olderEffort = getEffortStats(list.older);
        const currentEffort = getEffortStats(list.current);

        return (
            <div>
                { list.older.length > 0 &&
                    <div>
                        <Title>
                            älter
                            <span>{olderEffort.done}h / {olderEffort.total}h</span>
                        </Title>
                        
                        { list.older.map((job, index) => {
                            return <Job 
                                key={job.id}
                                id={job.id}
                                title={ job.title }
                                deadline={ format(job.deadlineAt, 'DD.MM.YYYY') }
                                effort={ job.effort }
                                phase={ job.phase.title }
                                description={ job.description }
                                project={`${job.project.shortcut} / ${job.project.title}`}
                                done={ job.isDone }
                                today={ false }
                                overdue={ true }
                                index={ index }
                                onClick={ this.handleJobToggle }
                            />
                        })}
                    </div>
                }

                <Title>
                    diese Woche
                    <span>{currentEffort.done}h / {currentEffort.total}h</span>
                </Title>
                
                { list.current.map((job, index) => {
                    const now = format(new Date(), 'YYYY-MM-DD')
                    const dl = format(job.deadlineAt, 'YYYY-MM-DD')
console.log(job);
                    return <Job 
                        key={job.id}
                        id={job.id}
                        title={ job.title }
                        deadline={ format(job.deadlineAt, 'DD.MM.YYYY') }
                        effort={ job.effort }
                        phase={ job.phase.title }
                        project={`${job.project.shortcut} / ${job.project.title}`}
                        done={ job.isDone }
                        today={ now === dl }
                        overdue={ now > dl }
                        index={ index }
                        onClick={ this.handleJobToggle }
                        description={job.description}
                    />
                })}
            </div>
        )
    }

    renderList(list, field) {
        const { done, total } = getEffortStats(list[field]);
        
        return (
            <div>
                <Title>
                    <span>{done}h / {total}h</span>
                </Title>
                { list[field].map((job, index) => {
                    return <Job 
                        key={job.id}
                        id={job.id}
                        title={ job.title }
                        deadline={ format(job.deadlineAt, 'DD.MM.YYYY') }
                        effort={ job.effort }
                        phase={ job.phase.title }
                        project={`${job.project.shortcut} / ${job.project.title}`}
                        done={ job.isDone }
                        today={ false }
                        overdue={ field === 'older' }
                        index={ index }
                        onClick={ this.handleJobToggle }
                        description={job.description}
                    />
                })}
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
        users, jobs, phases, projects
    ]) => {
        this.setState({
            isFetching: false,
            users, jobs, phases, projects
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

    handleLogout = () => {
        localStorage.removeItem(LS_KEY)
        this.setState({
            needsToLogin: true,
            email: null,
        })
    }

    handleChangeFilter = (type, value) => {
        this.setState({
            filter: {
                ...this.state.filter,
                [type]: value
            }
        })
    }

    handleJobToggle = id => {
        const index = getIndex(this.state, 'jobs', id)
        const job = {
            ...this.state.jobs[index],
            isDone: !this.state.jobs[index].isDone
        }

        this.setState({
            jobs: [
                ...this.state.jobs.slice(0, index),
                job,
                ...this.state.jobs.slice(index + 1),
            ]
        })

        updateJob(id, {
            name: 'isDone',
            value: !this.state.jobs[index].isDone
        })
    }

    handleSocketsData = data => {
        this.setState(
            getState(this.state, data)
        )
    }
}

export default App