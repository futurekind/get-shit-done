import React from 'react'
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    from {
        transform: rotate(0deg)
    }

    to {
        transform: rotate(360deg)
    }
`

const View = styled.div`
    width: 70px;
    height: 70px;
    margin-top: -35px;
    margin-left: -35px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #1fc2f4;
    animation: ${rotate} 1s linear both infinite;

    &::before {
        content: "";
        width: 56px;
        height: 56px;
        border-radius: 50%;
        position: absolute;
        top: 7px;
        left: 7px;
        background-color: #f1f1f1;
    }

    &::after {
        content: "";
        width: 24px;
        height: 10px;
        margin-left: -12px;
        background-color: #f1f1f1;
        position: absolute;
        top: 0;
        left: 50%;
    }
`

const Loader = () => <View />

export default Loader