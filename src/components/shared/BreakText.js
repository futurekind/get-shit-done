import { createElement } from 'react';

export default (props) => {
    return props.split('\n').map((fragment, i) => {
        return createElement('p', {
            key: i
        }, fragment)
    })
}