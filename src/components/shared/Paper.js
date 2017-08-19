import React from 'react'
import styled from 'styled-components';

const View = styled.div`
    padding: 12px;
    border-radius: 3px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px
`

const Paper = props => {
    return (
        <View className={ props.className }>
            { props.children }
        </View>
    )
}

export default Paper