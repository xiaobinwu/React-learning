/*
    *@params:
    *type: 图标的类型，注意跟样式表里的名字保持一致，否则调用不到
    *
    *网站里的小图标都应该集合在这里，这样管理起来方便。
    *目前除了体积较大的图片放在CDN，其他图片全部存放在这个组件中。
*/

import './index.scss';
import React from 'react';
import classNames from 'classnames';

let Icon = (props) => {
    let { type, size, className = '', children, prefix, width, height } = props;
    let cls = classNames({
        [prefix]: prefix,
        [className]: className,
        [`${prefix}-${size}`]: size,
        [`${prefix}-${type}`]: type
    })

    let style = {};
    if (width && height) {
        style.width = width;
        style.height = height;
    }

    return (
        <span className={cls} style={style}>
            {children}
        </span>
    )
};

Icon.propTypes = {
   type: React.PropTypes.string.isRequired,
   size: React.PropTypes.oneOf(['sm', 'md', 'lg']),
   prefix: React.PropTypes.string
}

Icon.defaultProps = {
    prefix: 'lbd-icon'
}

export default Icon;
