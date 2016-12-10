import './index.scss';
import React from 'react';
import classNames from 'classnames';

let Avatar = (props) => {
    let { url, size, round, link, prefix, className, onClick } = props;
    url = url || '//hstatic.hirede.com/lbd/mobile/images/common/defaultUser.png';

    let cls = classNames({
        [className]: !!className,
        [prefix]: !!prefix,
        [`${prefix}-round`]: round,
        [`${prefix}-${size}`]: !!size
    });

    return (
        <span className={cls} onTouchTap={onClick}>
            {link ? (
                <a href={link} className={`${prefix}-link`}>
                    <img src={url} className={`${prefix}-image`} />
                </a>
            ) : <img src={url} className={`${prefix}-image`} />}
        </span>
    )
};

Avatar.propTypes = {
   url: React.PropTypes.string,
   round: React.PropTypes.bool,
   size: React.PropTypes.oneOf(['sm', 'md', 'lg']),
   link: React.PropTypes.string,
   prefix: React.PropTypes.string,
   className: React.PropTypes.string,
   onClick: React.PropTypes.func
}

Avatar.defaultProps = {
    url: '//hstatic.hirede.com/lbd/mobile/images/common/defaultUser.png',
    prefix: 'lbd-avatar',
    round: true,
    size: 'md',
    onClick: function() {}
}

export default Avatar;
