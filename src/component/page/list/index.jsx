import './index.scss';
import React from 'react';
import ListItem from '../listItem/index';


let List = (props) => {
    let { className = '', list, isCard, type } = props;
    className += ` lbd-list ${!!isCard ? 'lbd-list-card' : ''}`;

    if (list.length === 0) {
        return null;
    }

    let lists = list.map((item, i) => {
        return <ListItem key={i} item={item} type={type} />
    })
    return (
        <ul className={className}>
            {lists}
        </ul>
    )
};

List.propTypes = {
    list: React.PropTypes.array.isRequired,
    isCard: React.PropTypes.bool
}

export default List;
