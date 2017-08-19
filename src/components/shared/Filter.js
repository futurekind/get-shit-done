import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components';

import Select from './Select'

const View = styled.section`
    margin-top: 24px;
    margin-bottom: 24px;
    font-weight: 300;

    @media (min-width: 48em) {
        font-size: 120%;
    }
`

const Filter = props => {
    
    const onChangeStatus = (e) => props.onChange('status', e.target.value)
    const onChangeSpan = (e) => props.onChange('span', e.target.value)
    
    return (
        <View>
            <span>Zeige </span>
            <Select 
                items={[
                    {value: 'ALL', label: 'alle'},
                    {value: 'OPEN', label: 'offene'},
                    {value: 'DONE', label: 'erledigte'},
                ]}
                value={ props.status }
                onSelect={ onChangeStatus }
            />
            <span> Jobs von </span>
            <Select 
                items={[
                    {value: 'WEEK', label: 'dieser Woche'},
                    {value: 'NEXT_WEEK', label: 'nächster Woche'},
                    {value: 'LAST_WEEK', label: 'letzter Woche'},
                ]}
                value={ props.span }
                onSelect={ onChangeSpan }
            />
        </View>
    )
}

Filter.defaultProps = {
    onChange: () => {}
}

Filter.propTypes = {
    status: PropTypes.string,
    span: PropTypes.string,
    onChange: PropTypes.func,
}

export default Filter