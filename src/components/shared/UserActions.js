import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const View = styled.div`
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: flex-end;
    cursor: pointer;

    span {
        padding-right: 10px;

        &:nth-of-type(2) { display: none; }
    }

    &:hover span {
        &:nth-of-type(1) { display: none; }
        &:nth-of-type(2) { display: inline; }
    }

    @media (min-width: 48em) {
        position: absolute;
        right: 24px;
        top: 35px;
    }
`

const Avatar = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
`

const UserActions = props => {
    
    if(!props.user.name) return null;

    return (
        <View onClick={ props.onClick }>
            <span>
                { props.user.name }
            </span>
            <span>Abmelden</span>
            <Avatar src={ props.user.imageUrl } />
        </View>
    )
}

UserActions.defaultProps = {
    onClick: () => {}
}

UserActions.propTypes = {
    user: PropTypes.object.isRequired,
    onClick: PropTypes.func,
}

export default UserActions