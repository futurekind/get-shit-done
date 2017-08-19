import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

const View = styled.div`
    display: inline-block;
    position: relative;
    color: #1fc2f4;
    cursor: pointer;

    &::after {
        content: "";
        border: 4px solid transparent;
        border-top-color: currentColor;
        position: absolute;
        right: 5px;
        top: 50%;
    }
`

const DropDown = styled.select`
    width: 100%;
    margin: 0;
    outline: none;
    padding: .5em;
    padding-bottom: .1em;
    padding-left: .2em;
    padding-right: 1em;
    font-size: 1em;
    background: none;
    border: 1px solid transparent; /* Match-05 */
    border-radius: 0;
    appearance: none;
    font-family: inherit;
    color: inherit;
    border-bottom: 1px solid currentColor;
`

const Select = props => {
    return (
        <View>
            <DropDown onChange={ props.onSelect } value={ props.value }>
                { props.items.map(item => {
                    return <option 
                        key={ item.value } 
                        value={ item.value } 
                    >{ item.label }</option>
                })}
            </DropDown>
        </View>
    )
}

Select.defaultProps = {
    items: [],
    onSelect: () => {}
}

Select.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.string,
        })
    ),
    value: PropTypes.string,
    onSelect: PropTypes.func,
}

export default Select