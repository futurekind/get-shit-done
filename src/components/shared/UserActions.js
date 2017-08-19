import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const View = styled.div`
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    font-size: 12px;
    justify-content: flex-end;

    span {
        padding-left: 10px;
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
    return (
        <View>
            <Avatar src={ props.user.imageUrl } />
            <span>
                { props.user.name }
            </span>
        </View>
    )
}

UserActions.propTypes = {
    user: PropTypes.object.isRequired,
}

export default UserActions