import React from 'react'
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import Paper from './Paper';

const appear = keyframes`
    from {
        opacity: 0
    }

    to { opacity: 1}
`

const View = styled(Paper)`
    max-width: 500px;
    margin: 64px auto;
    opacity: 0;
    animation: ${appear} 0.5s 0.1s ease-out both;
`

const Label = styled.label`
    display: block;
`

const Input = styled.input`
    width: 100%;
    margin-top: 24px;
    padding: 5px 0;
    border: none;
    border-radius: 0;
    border-bottom: 2px solid #7b7b7b;
    box-shadow: none;
    font-family: inherit;
    font-size: 16px;

    &:focus {
        outline: none;
        border-color: #1fc2f4;
    }

    &::placeholder {
        color: #ccc;
    }
`

const Error = styled.span`
    color: #dc0b0b;
`

const Login = props => {
    return (
        <View>
            <form onSubmit={ props.onSubmit }>
                <Label htmlFor="login">
                    { props.hasErrors &&
                        <Error>Ich würde dir ja gerne deine Jobs zeigen, aber ich kenne dich nicht! 
                            <br/>Wer bist du? <br/>Hast du dich vertippt? <br/>
                            Probier's nochmal oder melde dich per Fax bei webmaster@blateral.com</Error>
                    }
                    { !props.hasErrors &&
                        'Sag mir deine E-Mail und ich sag dir was du machst...'
                    }
                </Label>

                <Input name="email" type="email" placeholder="Deine E-Mail Adresse" id="login" />
            </form>
        </View>
    )
}

Login.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    hasErrors: PropTypes.bool,
}

export default Login