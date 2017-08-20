import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const View = styled.h2`
    margin: 24px 0 0;
    font-weight: 400;
    font-size: 18px;
    text-transform: uppercase;
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