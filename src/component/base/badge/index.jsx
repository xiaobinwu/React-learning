import './index.scss';
import React from 'react';
import classNames from 'classnames';

let Badge = (props) => {
    let { count, prefix, overflowCount, dot, className, children } = props;
    count = count > overflowCount ? `${overflowCount}+` : count;

    // dot mode don't need count
    if (dot) count = '';

    // null undefined "" "0" 0
    const hidden = (!count || count === '0') && !dot;
    const numberCls = prefix + (dot ? '-dot' : '-count');

    let classes = classNames({
        [className]: !!className,
        [prefix]: true,
        [`${prefix}-not-a-wrapper`]: !children
    })
    return (
        <span className={classes}>
            { children }
            { hidden ? null : <span className={numberCls}>{count}</span> }
        </span>
    )
};

Badge.propTypes = {
    count: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    dot: React.PropTypes.bool,
    overflowCount: React.PropTypes.number
}

Badge.defaultProps = {
    prefix: 'badge',
    dot: false,
    overflowCount: 99,
    count: null
}

export default Badge;
