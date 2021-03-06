import React from 'react'
import styled from 'styled-components';

const View = styled.section`
    max-width: 648px;
    margin: 0 auto;
    padding: 24px 12px;
    position: relative;
`

const Wrapper = (props) => {
    return (
        <View>
            { props.children }
        </View>
    )
}

export default Wrapper