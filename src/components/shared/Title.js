import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const View = styled.h2`
    margin: 24px 0 6px;
    font-weight: 400;
    font-size: 18px;
    text-transform: uppercase;
    display: flex;

    * { flex: 1; }

    span {
        font-size: 16px;
        font-weight: 300;
        text-transform: none;
        text-align: right;
    }
`

const Title = props => {
    return (
        <View>
            { props.children }
        </View>
    )
}

Title.propTypes = {}

export default Title