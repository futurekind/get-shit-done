import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Paper from './Paper'

const View = styled(Paper)`
    margin-bottom: 12px;
    display: flex;
`

const CheckContainer = styled.div`
    width: 60px;
`

const Content = styled.div`
    flex: 1;
    display: flex;
`

const Title = styled.div`
    font-weight: 700;
    letter-spacing: 0.5px;
    flex: 2;
`

const Deadline = styled.div`
    flex: 1;
    font-size: 14px;
`

const Effort = styled.div`
    font-size: 26px;
    color: #bdbdbd;
    line-height: 1;
`

const Job = props => {
    return (
        <View>
            <CheckContainer></CheckContainer>
            <Content>
                <Title>{ props.title }</Title>
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
}

export default Job