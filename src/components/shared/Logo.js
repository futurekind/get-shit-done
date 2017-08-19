import React from 'react'
import styled from 'styled-components';

const View = styled.h1`
    margin: 0;
    display: inline-block;
    position: relative;
    font-size: 2.8em;
    line-height: 1;
    font-weight: 400;
    text-shadow: #fff 0 -1px 0;

    *:nth-child(2) {
        color: #1fc2f4;
    }
`

const Dot = styled.span`
    width: 7px;
    height: 7px;
    margin-left: .09em;
    border-radius: 50%;
    position: absolute;
    bottom: .12em;
    color: transparent;
    background-color: #1fc2f4;
    text-shadow: none;
`

const Logo = () => {
    return (
        <View>
            <span>Getting</span>
            <span>Shit</span>
            <span>Done<Dot>.</Dot></span>
        </View>
    )
}

export default Logo