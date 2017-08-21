import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Paper from './Paper'

const View = styled(Paper)`
    margin-bottom: 12px;
    display: flex;
    position: relative;
    cursor: pointer;
    transition: transform .2s ease-in-out;

    &:hover {
        transform: scale(1.01);
    }

    ${props => {
        if(props.done) {
            return css`
                opacity: 0.6;
                box-shadow: none;
            `
        }
    }}
`

const CheckContainer = styled.div`
    width: 40px;
`

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (min-width: 48em) {
        flex-direction: row;
        // align-items: center;
    }
`

const MainCol = styled.div`
    order: 2;

    @media (min-width: 48em) {
        flex: 1;
        padding-right: 12px;
        order: 0;
    }
`

const Title = styled.div`
    font-weight: 700;
    letter-spacing: 0.5px;
`

const Subtitle = styled.div`
    font-weight: 300;
    font-size: 14px;

    span {
        color: #bdbdbd;
    }
`

const Deadline = styled.div`
    font-size: 14px;
    order: 1;

    @media (min-width: 48em) {
        padding-top: 5px;
        padding-right: 12px;
        order: 0;
    }
`

const Effort = styled.div`
    font-size: 26px;
    color: #bdbdbd;
    line-height: 1;
    text-align: right;
    position: absolute;
    right: 12px;

    @media (min-width: 48em) {
        position: static;
    }
`

const Job = props => {
    return (
        <View done={ props.done }>
            <CheckContainer></CheckContainer>
            <Content>
                <MainCol>
                    <Title>{props.title}</Title>
                    <Subtitle>{ props.project } <br/><span>{ props.phase }</span></Subtitle>
                </MainCol>
                <Deadline>{ props.deadline }</Deadline>
                <Effort>{`${props.effort} h`}</Effort>
            </Content>
        </View>
    )
}

Job.propTypes = {
    title: PropTypes.string,
    deadline: PropTypes.string,
    effort: PropTypes.number,
    phase: PropTypes.string,
    project: PropTypes.string,
    done: PropTypes.bool,
}

export default Job