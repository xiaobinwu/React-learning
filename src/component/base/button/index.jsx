import './index.scss';
import React from 'react';
import classNames from 'classnames';

let Button = (props) => {
    let { prefix, size, type, htmlType, onClick, loading, className, block, disabled, children } = props;

    let classes = classNames({
        [className]: !!className,
        [prefix]: true,
        [`${prefix}-${size}`]: size,
        [`${prefix}-${type}`]: type,
        [`${prefix}-loading`]: loading,
        [`${prefix}-disabled`]: disabled,
        [`${prefix}-block`]: block
    })

    return (
        <button
         className={classes}
         type={htmlType}
         onTouchTap={onClick}>
            {children}
        </button>
    )
};

Button.propTypes = {
    prefix: React.PropTypes.string,
    size: React.PropTypes.oneOf(['lg', 'md', 'sm']),
    type: React.PropTypes.oneOf(['border', 'hollow', 'solid']),
    htmlType: React.PropTypes.oneOf(['submit', 'button', 'reset']),
    onClick: React.PropTypes.func,
    loading: React.PropTypes.bool,
    className: React.PropTypes.string,
    block: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    children: React.PropTypes.node
}

Button.defaultProps = {
    prefix: 'button',
    loading: false,
    htmlType: 'button',
    disabled: false,
    onClick: function() {}
}

export default Button;
