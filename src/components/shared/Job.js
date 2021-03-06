import React from 'react'
import PropTypes from 'prop-types'
import styled, { css, keyframes } from 'styled-components'

import Paper from './Paper'
import nl2br from './BreakText'

const appear = keyframes`
    from {
        transform: scale(0)
    }

    to {
        transform: scale(1)
    }
`

const View = styled(Paper)`
    margin-bottom: 12px;
    display: flex;
    position: relative;
    cursor: pointer;
    transform: scale(0);
    transition: transform .2s ease-in-out;
    animation: ${appear} .1s 0.${props => props.index}s ease-out both;

    ${props => {
        if(props.done) {
            return css`
                opacity: 0.5;
                box-shadow: none;
            `
        }

        if(props.today && !props.done) {
            return css`
                box-shadow: rgba(68, 160, 68, 0.5) 0px 1px 6px, 
                            rgba(68, 160, 68, 0.5) 0px 1px 4px
            `
        }

        if (props.overdue && !props.done) {
            return css`
                box-shadow: rgba(233, 30, 99, 0.3) 0px 1px 6px, 
                            rgba(233, 30, 99, 0.3) 0px 1px 4px
            `
        }
    }}
`

const CheckContainer = styled.div`
    padding-right: 12px;

    &:hover {
        svg { fill: #1fc2f4 }
    }

    ${props => {
        if (props.done) {
            return css`

                &:hover {
                    svg { display: none; }
                    span { background-color: #fff; }
                }
            `
        }
    }}
`

const Content = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (min-width: 48em) {
        flex-direction: row;
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

const Checkbox = styled.span`
    width: 30px;
    height: 30px;
    border: 2px solid #1fc2f4;
    border-radius: 50%;
    display: inline-block;
    background-color: ${props => props.done ? '#1fc2f4' : '#fff'};
`

const CheckIcon = styled.svg`
    width: 24px;
    height: 24px;
    fill: #fff;
    transition: fill 0.1s ease-in-out;
`

const Description = styled.div`
    margin-top: 12px;
    padding-left: 12px;
    font-size: 14px;
    font-weight: 300;
    font-style: italic;
    border-left: 1px solid #1fc2f4;

    p {
        margin: 0.5em 0;
    }
`

const Job = props => {
    
    const onClick = () => props.onClick(props.id)

    return (
        <View 
            done={ props.done } 
            today={ props.today } 
            overdue={ props.overdue } 
            index={ props.index }
        >
            <CheckContainer onClick={onClick} done={props.done} >
                <Checkbox done={ props.done}>
                    <CheckIcon viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                    </CheckIcon>
                </Checkbox>
            </CheckContainer>
            <Content>
                <MainCol>
                    <Title>{props.title}</Title>
                    <Subtitle>{ props.project } <br/><span>{ props.phase }</span></Subtitle>
                    { props.description && props.description !== '' &&
                        <Description>
                            {nl2br(props.description)}
                        </Description>
                    }
                </MainCol>
                <Deadline>{ props.deadline }</Deadline>
                <Effort>{`${props.effort} h`}</Effort>
            </Content>
        </View>
    )
}

Job.defaultProps = {
    onClick: () => {}
}

Job.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    deadline: PropTypes.string,
    effort: PropTypes.number,
    phase: PropTypes.string,
    project: PropTypes.string,
    done: PropTypes.bool,
    today: PropTypes.bool,
    overdue: PropTypes.bool,
    onClick: PropTypes.func,
    description: PropTypes.string,
}

export default Job